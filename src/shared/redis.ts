import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

redisClient.on('error', (err) => console.error('Redis client error', err))

redisClient.connect()
    .then(() => console.log('Conectado ao Redis'))
    .catch((err) => console.error('Erro ao conectar ao Redis', err))