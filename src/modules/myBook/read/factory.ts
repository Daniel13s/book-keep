import { Idatabase } from "../shared/database.mybook.js";
import { ReadMyBookController } from "./controller.js";
import { ReadMyBookService } from "./service.js";

export function makeReadMyBookController(database: Idatabase){
    const service = new ReadMyBookService(database)
    const controller = new ReadMyBookController(service)

    return controller
}