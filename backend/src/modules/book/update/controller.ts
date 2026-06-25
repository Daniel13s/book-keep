import { NextFunction, Request, Response } from "express";
import { bodySchema, paramSchema } from "../shared/schema.js";

export class UpdateBookController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = paramSchema.parse(req.params)
            const {title, description, author, category} = bodySchema.parse(req.body)

            const book = {
                title,
                description,
                author,
                category
            }

            const response = await this.service.execute(id, book)

            return res.status(201).json({message: "book updated!"})
        } catch(err){
            return res.status(500).json({message: "Internal server error."})
        }
    }
}