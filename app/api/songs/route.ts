import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Song from '@/models/Song';
import { songs as defaultSongs } from '@/data/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        
        let songs = await Song.find({});

        // AUTO-SETUP: If no songs in database, migrate from constants.ts
        if (songs.length === 0) {
            console.log('--- AUTO-MIGRATING SONGS ---');
            const songsToInsert = defaultSongs.map(s => ({
                customId: s.id.toString(),
                title: s.title,
                artist: s.artist,
                cover: s.cover,
                src: s.src
            }));
            try {
                await Song.insertMany(songsToInsert);
                songs = await Song.find({}); // Refresh after insert
            } catch (seedError) {
                console.error('Auto-migration failed:', seedError);
            }
        }

        const formattedSongs = songs.map(s => ({
            id: s.customId,
            title: s.title,
            artist: s.artist,
            cover: s.cover,
            src: s.src,
            isOnline: s.isOnline,
            _id: s._id
        }));
        
        return NextResponse.json({ success: true, data: formattedSongs });
    } catch (error) {
        console.error('API Songs Error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 400 });
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
