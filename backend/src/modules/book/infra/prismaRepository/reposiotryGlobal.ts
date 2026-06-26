import { prisma } from "../../../../infra/prisma.js";

export class PrismaRepository {
    async create(book: any){
        const response = await prisma.book.create({
            data: {...book}
        })

        return response
    }
    async list(category: string, search: string, limit: number, page: number){
        const response = await prisma.book.findMany({
            where: {
                ...(search&&{
                    title: {
                        contains: search,
                    }
                }),
                ...(category&&{
                    category: {
                        contains: category,
                    }
                })
            },
            take: limit,
            skip: (page - 1) * limit
        })

        return response
    }
    async update(id: string, book: any){
        const response = await prisma.book.update({
            where: {id},
            data:{
                ...book
            }
        })

        return response
    }
    async delete(id:string) {
        const response = await prisma.book.delete({
            where: {id}
        })

        return response
    }
    async findBook(id:string) {
        const response = await prisma.book.findFirst({
            where: {id}
        })

        return response
    }
}