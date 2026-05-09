import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
    } | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}
const cached = global.mongoose;

async function dbConnect() {
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            connectTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000,  // 45 seconds timeout
        };

        console.log('--- MONGODB CONNECTING ---');
        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
            console.log('--- MONGODB CONNECTED ---');
            return mongoose.connection;
        }).catch(err => {
            console.error('--- MONGODB CONNECTION ERROR ---', err);
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
