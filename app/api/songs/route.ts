import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Song from '@/models/Song';
import { songs as defaultSongs } from '@/data/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Attempt to connect and fetch from DB
        try {
            await dbConnect();
            let songs = await Song.find({});

            // AUTO-SETUP: Sync missing default songs if count doesn't match
            if (songs.length < defaultSongs.length) {
                console.log(`--- SYNCING MISSING SONGS (${songs.length} -> ${defaultSongs.length}) ---`);
                for (const s of defaultSongs) {
                    const songId = s.id.toString();
                    const exists = await Song.exists({ customId: songId });
                    if (!exists) {
                        try {
                            await Song.create({
                                customId: songId,
                                title: s.title,
                                artist: s.artist,
                                cover: s.cover,
                                src: s.src
                            });
                        } catch (e) {
                            console.error(`Failed to seed song ${songId}:`, e);
                        }
                    }
                }
                songs = await Song.find({}); // Refresh
            }

            if (songs.length > 0) {
                const formattedSongs = songs.map(s => ({
                    id: s.customId,
                    title: s.title,
                    artist: s.artist,
                    cover: s.cover,
                    src: s.src,
                    isOnline: s.isOnline,
                    _id: s._id
                }));
                return NextResponse.json({ success: true, data: formattedSongs, source: 'database' });
            }
        } catch (dbError) {
            console.error('Database connection failed, using fallback:', dbError);
        }

        // FALLBACK: If DB fails or is empty, return constants
        console.log('--- USING STATIC FALLBACK DATA ---');
        return NextResponse.json({ 
            success: true, 
            data: defaultSongs, 
            source: 'static-fallback',
            dbError: 'Database unavailable, showing default songs.'
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        
        if (!body.customId) {
            body.customId = Date.now().toString();
        }

        const song = await Song.create(body);
        return NextResponse.json({ success: true, data: song });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 400 });
    }
}
