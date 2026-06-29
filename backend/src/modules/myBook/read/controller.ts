import { NextFunction, Request, Response } from "express";
import { paramSchema } from "../shared/schema.js";
import { AppError } from "../../../error/appError.js";

export class ReadMyBookController {
    constructor(public service: any) {}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            console.log("controller")
            const {id} = paramSchema.parse(req.params)
            const {status} = req.body
            const validStatus = ["FECHADO", "LENDO", "LIDO"]

            if(!validStatus.includes(status)) throw new AppError(401, "Status invalid.")
            
            const response  = await this.service.execute(id, status)
            return res.status(201).json({message: "Book is readed"})
        }catch(err){
            return next()
        }
    }
}