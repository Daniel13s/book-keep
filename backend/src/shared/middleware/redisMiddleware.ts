import { NextFunction, Request, Response } from "express";
import { redisClient } from "../redis.js";

export async function redisMiddleware(req:Request, res: Response, next: NextFunction) {
    const key = `cache:${req.originalUrl || req.url}`

    try {
        if(req.method === 'POST' || req.method === "DELETE") {
            await redisClient.flushAll()

            return next()
        }
        const cachedData = await redisClient.get(key)

        if(cachedData) {
            res.setHeader("X-cache", "HIT")

            return res.json(JSON.parse(cachedData))
        }

        res.setHeader("X-cache", "MISS")

        const originaLJson = res.json

        res.json = function (body) {
            res.json = originaLJson

            if(res.statusCode === 200) {
                redisClient.setEx(key, 300, JSON.stringify(body))
                    .catch(err => console.error('Erro ao salvar no Redis', err))
            }

            return res.json(body)
        }

        return next()
    }catch(err) {
        console.error('Erro no middleware de cache', err)
        return next()
    }
}