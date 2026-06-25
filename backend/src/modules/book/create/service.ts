import { Idatabase } from "../shared/database.reposiotry.js"

export class CreateBookService {
    constructor(public repository: Idatabase) {}
    async execute(data: any) {
        const response = await this.repository.create(data)

        return response
    }
}