import { AppError } from "../../../error/appError.js"
import { Idatabase } from "../shared/database.mybook.js"

export class CreateMyBookService {
    constructor(public repository: Idatabase) {}
    async execute(id: string, userId: string) {
        const book = await this.repository.getBook(id)

        if(!book) throw new AppError(404, "This book is absent")

        const newBook = {
            id: book.id,
            imageUrl: book.imageUrl,
            title: book.title,
            description: book.description,
            author: book.author,
            category: book.category,
            isReaded: false,
            userId
        }

        const response = await this.repository.create(newBook)

        return response
    }
}