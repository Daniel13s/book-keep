import { NextFunction, Request, Response } from "express";
import { paramSchema } from "../shared/schema.js";

export class DeleteBookController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = paramSchema.parse(req.params)

            const response = await this.service.execute(id)

            return res.status(200).json({message: "book deleted!", id: response.id})
        } catch(err){
            return next()
        }
    }
}