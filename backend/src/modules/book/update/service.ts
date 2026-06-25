import { AppError } from "../../../error/appError.js"
import { Idatabase } from "../shared/database.reposiotry.js"

export class UpdateBookService {
    constructor(public repository: Idatabase) {}
    async execute(id: string, book: any) {
        const response = await this.repository.update(id, book)

        if(!response) throw new AppError(404, "Livro não encontrado.")

        return response
    }
}