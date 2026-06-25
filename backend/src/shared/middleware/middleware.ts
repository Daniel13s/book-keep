import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

export function middleware(req: Request, res: Response, next: NextFunction){
    const auth = req.headers.authorization

    if(!auth) throw new Error("Token not provided.")

    const token = auth.split(" ")[1]

    if(!token) throw new Error("Incorrect token format.")

    const user = jwt.verify(token, process.env.SECRET_KEY!)

    req.user = user as {id: string, name: string}

    return next()
}