import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var _mongoClientPromise: Promise<typeof import("mongoose")> | null;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
if (!global._mongoClientPromise) {
    const opts = {
        bufferCommands: false,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    };
    
    console.log('--- MONGODB INIT CONNECTION ---');
    global._mongoClientPromise = mongoose.connect(MONGODB_URI as string, opts)
        .then((m) => {
            console.log('--- MONGODB CONNECTED ---');
            return m;
        })
        .catch((e) => {
            console.error('--- MONGODB ERROR ---', e);
            global._mongoClientPromise = null;
            throw e;
        });
}

async function dbConnect() {
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try {
        const m = await global._mongoClientPromise;
        return m.connection;
    } catch (e) {
        console.error('Failed to await mongo promise', e);
        throw e;
    }
}

export default dbConnect;
