import { NextFunction, Request, Response } from "express";
import { querySchema } from "../shared/schema.js";

export class ListBookController {
    constructor(public service: any){}
    async execute(req: Request, res: Response, next: NextFunction) {
        try{
            const {category, search, limit, page} = querySchema.parse(req.query)

            const limitNum = Number(limit)
            const pageNum = Number(page)

            const response = await this.service.execute(category?.toLowerCase, search?.toLowerCase, limitNum, pageNum)

            return res.status(200).json({books: response})
        } catch(err){
            return next()
        }
    }
}