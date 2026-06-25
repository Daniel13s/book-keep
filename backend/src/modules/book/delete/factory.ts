import { DeleteBookController } from "./controller.js";
import { DeleteBookService } from "./service.js";

export function makeDeleteBookController(database: any) {
    const service = new DeleteBookService(database)
    const controller = new DeleteBookController(service)

    return controller
}