export class DatabaseUser {
    user:any[] = []

    async register(name:string, email:string, password:string){
        const user = {
            name,
            email,
            password
        }

        const response = this.user.push(user)

        return response
    }
    async getUser(email:string){
        const response = this.user.find(u => u.email === email)

        return response
    }
}