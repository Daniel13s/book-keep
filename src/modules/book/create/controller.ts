import { NextFunction, Request, Response } from "express";
import { bodySchema } from "../shared/schema.js";

export class CreateBookController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {imageUrl, title, description, author, category} = bodySchema.parse(req.body)

            const book = {
                imageUrl,
                title,
                description,
                author,
                category
            }

            const response = await this.service.execute(book)

            return res.status(201).json({message: "book created!", id: response.id})
        } catch(err){
            return next()
        }
    }
}