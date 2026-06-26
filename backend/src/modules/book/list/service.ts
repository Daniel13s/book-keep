import { Idatabase } from "../shared/database.reposiotry.js"

export class ListBookService {
    constructor(public repository: Idatabase) {}
    async execute(category:string, search:string, limit: number, page: number) {
        const response = await this.repository.list(category, search, limit, page)

        return response
    }
}