import { createClient } from 'redis';

// Use a Singleton pattern to ensure a single Redis client instance
let client;

async function getClient() {
    if (!client) {
        client = createClient({
            url: process.env.UPSTASH_REDIS_URL,
            password: process.env.UPSTASH_REDIS_PASSWORD,
            socket: {
                tls: true,
            },
        });

        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect()
    }
    return client;
}

// Cache a response with a TTL of 1 day (86400 seconds)
async function cacheResponse(problemSlug, promptType, response) {
    const client = await getClient();
    const cacheKey = `response:${problemSlug}:${promptType}`;
    await client.setEx(cacheKey, 86400, response);
    console.log(`Cached response for ${problemSlug}:${promptType}`);
}

// Get a cached response
async function getCachedResponse(problemSlug, promptType) {
    const client = await getClient();
    const cacheKey = `response:${problemSlug}:${promptType}`;
    return await client.get(cacheKey);
}

export { cacheResponse, getCachedResponse };
