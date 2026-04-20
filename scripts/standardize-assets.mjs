import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Manually parse .env.local if it exists
try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                process.env[key.trim()] = valueParts.join('=').trim();
            }
        });
    }
} catch (err) {
    console.warn('Manual .env.local parse failed:', err);
}

const MONGODB_URI = process.env.MONGODB_URI;

// Helper to slugify filenames
function standardizeName(name) {
    const ext = path.extname(name);
    let base = path.basename(name, ext);
    
    // Remove Vietnamese accents
    base = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    
    // Lowecase, replace spaces/special chars with hyphen
    return base.toLowerCase()
        .replace(/[^a-z0-9-]/g, '-') // keep alphanumeric and hyphen
        .replace(/-+/g, '-')             // collapse hyphens
        .replace(/^-|-$/g, '')           // trim hyphens
        + ext.toLowerCase();
}

async function run() {
    console.log('--- STARTING ASSET STANDARDIZATION ---');

    const directories = ['public/sound', 'public/img'];
    const renameMap = {
        sound: {},
        img: {}
    };

    // 1. Rename physical files
    for (const dir of directories) {
        const dirPath = path.join(process.cwd(), dir);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const oldPath = path.join(dirPath, file);
            if (fs.lstatSync(oldPath).isDirectory()) continue;

            const newName = standardizeName(file);
            const newPath = path.join(dirPath, newName);

            if (file !== newName) {
                console.log(`Renaming: "${file}" -> "${newName}"`);
                fs.renameSync(oldPath, newPath);
                
                const type = dir.includes('sound') ? 'sound' : 'img';
                renameMap[type][file] = newName;
            }
        }
    }

    // 2. Update Database
    if (MONGODB_URI) {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        
        // Define temp schema for update
        const SongSchema = new mongoose.Schema({
            title: String,
            cover: String,
            src: String
        }, { collection: 'songs' });
        
        const Song = mongoose.models.Song || mongoose.model('Song', SongSchema);
        
        const songs = await Song.find({});
        console.log(`Found ${songs.length} songs to check in DB.`);

        let updateCount = 0;
        for (const song of songs) {
            let changed = false;
            let currentSrc = song.src;
            let currentCover = song.cover;

            // Check src
            if (currentSrc.startsWith('/sound/')) {
                const oldFileName = currentSrc.replace('/sound/', '');
                const newFileName = renameMap.sound[oldFileName];
                if (newFileName) {
                    song.src = `/sound/${newFileName}`;
                    changed = true;
                }
            }

            // Check cover
            if (currentCover.startsWith('/img/')) {
                const oldFileName = currentCover.replace('/img/', '');
                const newFileName = renameMap.img[oldFileName];
                if (newFileName) {
                    song.cover = `/img/${newFileName}`;
                    changed = true;
                }
            }

            if (changed) {
                await song.save();
                updateCount++;
                console.log(`Updated DB Entry: ${song.title}`);
            }
        }
        
        console.log(`Database sync complete. Updated ${updateCount} records.`);
        await mongoose.disconnect();
    } else {
        console.warn('MONGODB_URI not found. Skipping DB update.');
    }

    console.log('--- STANDARDIZATION COMPLETE ---');
}

run().catch(err => {
    console.error('Fatal Script Error:', err);
    process.exit(1);
});
