import { CreateBookController } from "./controller.js";
import { CreateBookService } from "./service.js";

export function makeCreateBookController(database: any) {
    const service = new CreateBookService(database)
    const controller = new CreateBookController(service)

    return controller
}