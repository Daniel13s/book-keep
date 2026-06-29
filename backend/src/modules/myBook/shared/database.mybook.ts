export interface Idatabase {
    create(book: any): Promise<any>;
    getBook(id: string): Promise<any>;
    list(id: string, limit: number, page: number, search:string): Promise<any>
    read(id: string, status: any): Promise<any>,
    delete(id:string): Promise<any>
}