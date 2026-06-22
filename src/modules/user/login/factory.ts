import { IdatabaseUser } from "../shared/repository.interface.js";
import { LoginUserController } from "./controller.js";
import { LoginUserService } from "./service.js";

export function makeLoginUserController(database: IdatabaseUser){
    const service = new LoginUserService(database)
    const controller = new LoginUserController(service)

    return controller
}