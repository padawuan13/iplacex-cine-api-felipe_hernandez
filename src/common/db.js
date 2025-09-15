import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB || "cine-db";

let client;

export function getClient() {
    if (!client) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    return client;
}

export async function connectMongo() {
    const client = getClient();
    await client.connect();
    return client;
}

export function getDb() {
    if (!client) 
        throw new Error("MongoDB client no inicializado");
    return client.db(dbName);
    
}
