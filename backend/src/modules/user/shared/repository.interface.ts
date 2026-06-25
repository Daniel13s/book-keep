export interface IdatabaseUser{
    register(name: string, email:string, password:string): Promise<any>;
    getUser(email: string): Promise<any>
}