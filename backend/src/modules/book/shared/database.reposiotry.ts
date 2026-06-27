export interface Idatabase {
    create(book: {title: string; description: string}): Promise<any>,
    list(category: string, search: string, limit: number, page: number): Promise<any[]>,
    update(id: string, book: any): Promise<any>,
    delete(id:string): Promise<any>,
    findBook(id:string): Promise<any>
}