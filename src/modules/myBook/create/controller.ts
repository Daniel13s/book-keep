import { NextFunction, Request, Response } from "express";
import { paramSchema, userSchema } from "../shared/schema.js";

export class CreateMyBookController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = paramSchema.parse(req.params)
            const user = userSchema.parse(req.user)

            const response = await this.service.execute(id, user.id)

            return res.status(201).json({message: "book copied!", id: response.id})
        } catch(err){
            return next()
        }
    }
}