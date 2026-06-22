import { IdatabaseUser } from "../shared/repository.interface.js";
import { RegisterUserController } from "./controller.js";
import { RegisterUserService } from "./service.js";

export function makeRegisterUserController(database: IdatabaseUser){
    const service = new RegisterUserService(database)
    const controller = new RegisterUserController(service)

    return controller
}