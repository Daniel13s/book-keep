import { CreateBookService } from "../../../modules/book/create/service.js";
import { UpdateBookService } from "../../../modules/book/update/service.js";
import { CreateMyBookService } from "../../../modules/myBook/create/service.js";
import { ReadMyBookService } from "../../../modules/myBook/read/service.js";
import { LoginUserService } from "../../../modules/user/login/service.js";
import { RegisterUserService } from "../../../modules/user/register/service.js";
import { DatabaseBook } from "./infra/database.book.js";
import { DatabaseMyBook } from "./infra/database.mybook.js";
import { DatabaseUser } from "./infra/database.user.js";

export function makeSutService() {
    const databaseUser = new DatabaseUser()
    const databaseBook = new DatabaseBook()
    const databaseMyBook = new DatabaseMyBook()
    const serviceUserRegister = new RegisterUserService(databaseUser)
    const serviceUserLogin = new LoginUserService(databaseUser)
    const serviceBookCreate = new CreateBookService(databaseBook)
    const serviceBookUpdate = new UpdateBookService(databaseBook)
    const serviceMyBookCreate = new CreateMyBookService(databaseMyBook)
    const serviceMyBookRead = new ReadMyBookService(databaseMyBook)

    return {serviceUserRegister, serviceUserLogin, serviceBookCreate, serviceBookUpdate, serviceMyBookCreate, serviceMyBookRead}
}