import { AppError } from "../../../error/appError.js"
import { Idatabase } from "../shared/database.reposiotry.js"

export class DeleteBookService {
    constructor(public repository: Idatabase) {}
    async execute(id: string) {
        const valid = await this.repository.findBook(id)

        if(!valid) throw new AppError(404, "This book doesn't exist.")
        
        const response = await this.repository.delete(id)

        return response
    }
}