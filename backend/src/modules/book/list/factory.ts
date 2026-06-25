import { ListBookController } from "./controller.js";
import { ListBookService } from "./service.js";

export function makeListBookController(database: any) {
    const service = new ListBookService(database)
    const controller = new ListBookController(service)

    return controller
}