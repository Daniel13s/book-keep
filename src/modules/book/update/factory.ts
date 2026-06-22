import { UpdateBookController } from "./controller.js";
import { UpdateBookService } from "./service.js";

export function makeUpdateBookController(database: any) {
    const service = new UpdateBookService(database)
    const controller = new UpdateBookController(service)

    return controller
}