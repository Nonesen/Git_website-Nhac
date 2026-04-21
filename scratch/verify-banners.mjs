import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const pageFile = path.join(process.cwd(), 'app', 'page.tsx');

console.log('--- CHECKING APP/PAGE.TSX BANNERS ---');

const content = fs.readFileSync(pageFile, 'utf8');
const paths = content.match(/\/img\/banner[^\s",']+/g) || [];

let brokenCount = 0;

const uniquePaths = [...new Set(paths)];
console.log(`Found ${uniquePaths.length} unique banner paths.`);

uniquePaths.forEach(p => {
    const fullPath = path.join(publicDir, p);
    if (!fs.existsSync(fullPath)) {
        console.error(`Broken Path: ${p}`);
        brokenCount++;
    } else {
        console.log(`OK: ${p}`);
    }
});

if (brokenCount === 0) {
    console.log('All banner paths in app/page.tsx are valid!');
} else {
    console.log(`Found ${brokenCount} broken banner paths.`);
}
