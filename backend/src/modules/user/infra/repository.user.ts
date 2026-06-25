import { prisma } from "../../../infra/prisma.js";
import { IdatabaseUser } from "../shared/repository.interface.js";

export class UserRepository implements IdatabaseUser{
    async register(name:string, email: string, password: string){
        const response = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return response
    }
    async getUser(email: string){
        const response = await prisma.user.findUnique({
            where: {email}
        })

        return response
    }
}