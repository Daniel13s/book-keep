import { NextFunction, Request, Response } from "express";
import { querySchema, userSchema } from "../shared/schema.js";

export class ListMyBookController {
    constructor(public service: any) {}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = userSchema.parse(req.user)
            const {search,limit, page} = querySchema.parse(req.query)
            
            const response  = await this.service.execute(id, page, limit, search)
            return res.status(200).json({my_books: response})
        }catch(err){
            return next()
        }
    }
}