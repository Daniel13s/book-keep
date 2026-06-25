export class DatabaseBook {
    book: any[] = []
    async create(data: any) {
        const response = this.book.push(data)

        return response
    }
    async list(){
        return this.book
    }
    async update(id: string, data: any) {
        const book = this.book.find(b => b.id === id)

        book.title = data.title
        book.description = data.description

        return book
    }
    async delete(id:string) {
        const response = this.book.filter(book => book.id !== id)

        this.book = response
        
        return response
    }
    async findBook(id:string) {
        const response = await this.book.find(book => book.id === id)

        return response
    }
}