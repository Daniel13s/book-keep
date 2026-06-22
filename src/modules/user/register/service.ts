import { AppError } from "../../../error/appError.js";
import { IdatabaseUser } from "../shared/repository.interface.js";
import bcrypt from "bcrypt"

export class RegisterUserService {
    constructor(public repository: IdatabaseUser){}
    async execute(name: string, email: string, password: string){
        const valid = await this.repository.getUser(email)

        if(valid) throw new AppError(409, "User already exist.")

        const newPassword = await bcrypt.hash(password, 10)

        const response = await this.repository.register(name, email, newPassword)

        return response
    }
}