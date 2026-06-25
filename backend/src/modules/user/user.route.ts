import { Router } from "express";
import { UserRepository } from "./infra/repository.user.js";
import { makeRegisterUserController } from "./register/factory.js";
import { makeLoginUserController } from "./login/factory.js";

export const userRoute = Router()

const database = new UserRepository()

const controllerRegisterUser = makeRegisterUserController(database)
const controllerLoginUser = makeLoginUserController(database)

userRoute.post("/register", controllerRegisterUser.execute.bind(controllerRegisterUser))
userRoute.post("/login", controllerLoginUser.execute.bind(controllerLoginUser))