import { DeleteMyBookController } from "./controller.js";
import { DeleteMyBookService } from "./service.js";

export function makeDeleteMyBookController(database: any) {
    const service = new DeleteMyBookService(database)
    const controller = new DeleteMyBookController(service)

    return controller
}