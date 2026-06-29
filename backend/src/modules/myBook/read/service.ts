import { Idatabase } from "../shared/database.mybook.js";

export class ReadMyBookService {
    constructor(public repository: Idatabase) {}
    async execute(id: string, status: string){
        return await this.repository.read(id, status)
    }
}