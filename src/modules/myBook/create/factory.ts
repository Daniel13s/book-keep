import { CreateMyBookController } from "./controller.js";
import { CreateMyBookService } from "./service.js";

export function makeCreateMyBookController(database: any) {
    const service = new CreateMyBookService(database)
    const controller = new CreateMyBookController(service)

    return controller
}