import { Idatabase } from "../shared/database.reposiotry.js"

export class ListBookService {
    constructor(public repository: Idatabase) {}
    async execute(search:string, limit: number, page: number) {
        const response = await this.repository.list(search, limit, page)

        return response
    }
}