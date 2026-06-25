import { prisma } from "../../../infra/prisma.js";
import { Idatabase } from "../shared/database.mybook.js";

export class MyBookRepository implements Idatabase {
    async create(book: any) {
        const response = await prisma.myBook.create({
            data: {...book}
        })

        return response
    }
    async getBook(id: string) {
        const book = await prisma.book.findFirst({
            where: {id}
        })

        return book
    }
    async list(id: string, limit: number, page: number, search: string) {
        const response = await prisma.myBook.findMany({
            where: {
                userId: id,
                ...(search&&{
                    title: {
                        contains: search,
                    }
                })
            },
            take: limit,
            skip: (page - 1) * limit
        })

        return response
    }
    async read(id: string) {
        const response = await prisma.myBook.update({
            where: {id},
            data: {
                isReaded: true
            }
        })

        return response
    }
    async delete(id:string) {
        const response = await prisma.myBook.delete({
            where: {id}
        })

        return response
    }
}