import { Idatabase } from "../shared/database.mybook.js";
import { ListMyBookController } from "./controller.js";
import { ListMyBookService } from "./service.js";

export function makeListMyBookController(database: Idatabase){
    const service = new ListMyBookService(database)
    const controller = new ListMyBookController(service)

    return controller
}