import express, { NextFunction, Request, Response } from "express"
import { routesBook } from "./modules/book/book.route.js"
import { routesMyBook } from "./modules/myBook/myBook.route.js"
import { userRoute } from "./modules/user/user.route.js"
import { AppError } from "./error/appError.js"

export const app = express()

app.use(express.json())

app.use((req: Request, res:Response,next:NextFunction) => {
    console.log(`Requisicao: ${req.method} na rota ${req.url}`)

    return next()
})

app.use(routesBook)
app.use(routesMyBook)
app.use(userRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) return res.status(err.statusCode).json(err.message)

    return res.status(500).json({message: "Internal server error."})
})