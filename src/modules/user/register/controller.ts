import { NextFunction, Request, Response } from "express";
import { bodySchema } from "../shared/schema.js";

export class RegisterUserController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const {name, email, password} = bodySchema.parse(req.body)
            
            const response = await this.service.execute(name, email, password)

            return res.status(201).json({message: "User registed."})
        }catch(err){
            console.log(err)
            return next()
        }
    }
}