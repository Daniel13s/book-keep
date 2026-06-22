import { NextFunction, Request, Response } from "express";
import { bodySchema } from "../shared/schema.js";

export class LoginUserController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = bodySchema.parse(req.body)
            
            const response = await this.service.execute(email, password)

            return res.status(200).json({token: response})
        }catch(err){
            return next()
        }
    }
}