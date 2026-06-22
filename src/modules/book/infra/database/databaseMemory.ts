import crypto from "node:crypto"

export class DatabaseMemory {
    books: any[] = []
    create(data: any) {
        const id = crypto.randomUUID()

        const book = {
            id,
            ...data
        }

        const response = this.books.push(book)

        return response
    }
    list() {
        return this.books
    }
    update(id: string) {
        const book = this.books.find(book => book.id === id)

        if(!book) throw new Error()

        book.isReaded = true

        return book
    }
}