import { IdatabaseUser } from "../shared/repository.interface.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../../../error/appError.js";

export class LoginUserService {
    constructor(public repository: IdatabaseUser){}
    async execute(email: string, password: string){
        const login = await this.repository.getUser(email)

        if(!login) throw new AppError(401, "User not exist.")

        const validPassword = bcrypt.compare(password, login.password)

        if(!validPassword) throw new AppError(401, "Password incorrect.")

        const token = jwt.sign({
            id: login.id,
            name: login.name
        }, process.env.SECRET_KEY!,{
            expiresIn: "15m"
        })

        return token
    }
}