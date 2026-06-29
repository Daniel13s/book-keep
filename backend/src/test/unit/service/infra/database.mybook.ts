export class DatabaseMyBook {
    myBook: any[] = []
    async create(book: any) {
        const response = this.myBook.push(book)

        return response
    }
    async getBook(id: string) {
        const book = {
            id: "primeiro",
            title: "harry potter",
            description: "livro bem massa",
        }

        return book
    }
    async list(id: string) {
        return this.myBook
    }
    async read(id: string, status: any) {
        const book = await this.myBook.find(b => b.id === id)

        book.isReaded = status

        return book
    }
    async delete(id:string) {
        const response = this.myBook.filter(book => book.id !== id)

        this.myBook = response
        
        return response
    }
}