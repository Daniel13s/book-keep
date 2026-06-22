import { Router } from "express";
import { makeCreateMyBookController } from "./create/factory.js";
import { MyBookRepository } from "./infra/database.repository.js";
import { makeListMyBookController } from "./list/factory.js";
import { makeReadMyBookController } from "./read/factory.js";
import { middleware } from "../../shared/middleware/middleware.js";

export const routesMyBook = Router()
const database = new MyBookRepository()
const controllerCreateMyBook = makeCreateMyBookController(database)
const controllerListMyBook = makeListMyBookController(database)
const controllerReadMyBook = makeReadMyBookController(database)

routesMyBook.post("/myBook/:id", middleware, controllerCreateMyBook.execute.bind(controllerCreateMyBook))
routesMyBook.get("/myBooks", middleware, controllerListMyBook.execute.bind(controllerListMyBook))
routesMyBook.put("/myBook/:id", middleware, controllerReadMyBook.execute.bind(controllerReadMyBook))