import { id } from "zod/locales";
import { Idatabase } from "../shared/database.mybook.js";

export class ListMyBookService {
    constructor(public repository: Idatabase) {}
    async execute(id: string, page: string, limit: string, search:string){
        const limitNum = Number(limit)
        const pageNum = Number(page)
        return await this.repository.list(id, limitNum, pageNum, search)
    }
}