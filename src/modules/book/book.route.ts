import { Router } from "express";
import { makeCreateBookController } from "./create/factory.js";
// import { DatabaseMemory } from "./infra/database/databaseMemory.js";
import { makeListBookController } from "./list/factory.js";
import { makeUpdateBookController } from "./update/factory.js";
import {PrismaRepository} from "./infra/prismaRepository/reposiotryGlobal.js"
import { middleware } from "../../shared/middleware/middleware.js";
import { redisMiddleware } from "../../shared/middleware/redisMiddleware.js";

export const routesBook = Router()

// const database = new DatabaseMemory()
const database = new PrismaRepository()

const createBook = makeCreateBookController(database)
const listBook = makeListBookController(database)
const updateBook = makeUpdateBookController(database)

routesBook.post("/book", middleware, createBook.execute.bind(createBook))
routesBook.get("/book", middleware, redisMiddleware, listBook.execute.bind(listBook))
routesBook.put("/book/:id", middleware, updateBook.execute.bind(updateBook))