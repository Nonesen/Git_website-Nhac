import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        // We try both hashed and plain text (for initial migration check)
        // In a real app we would only use compare
        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, user.password as string);
        } catch (error) {
            console.log('Bcrypt error, falling back to plain text check');
        }

        if (!isMatch) {
            isMatch = password === user.password;
        }

        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Record activity
        user.lastActive = new Date();
        await user.save();

        return NextResponse.json({
            success: true,
            user: {
                username: user.username,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}
