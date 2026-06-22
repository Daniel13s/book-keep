import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest"
import { app } from "../../../app.js";
import { prisma } from "../../../infra/prisma.js";

let token: string;
let id: string;

beforeAll(async () => {
    const register = await request(app)
        .post("/auth")
        .send({
            name: "Daniel Silva",
            email: "dansilvac254@gmail.com",
            password: "Danielsilvac254!"
        })

    const login = await request(app)
        .get("/auth")
        .send({
            email: "dansilvac254@gmail.com",
            password: "Danielsilvac254!"
        })

    token = login.body.token!

    const createBook = await request(app)
        .post("/book")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "harry potter",
            description: "livro muito legal",
            author: "J.K Howling",
            category: "sobrenatural"
        })
    
    id = createBook.body.id
})

test("should create myBooks.", async () => {
    const response = await request(app)
        .post(`/myBook/${id}`)
        .set("Authorization", `Bearer ${token}`)

    id = response.body.id

    expect(response.status).toBe(201)
})

test("should update a myBook.", async () => {
    const response = await request(app)
        .put(`/myBook/${id}`)
        .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(201)
})

afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.book.deleteMany()
    await prisma.myBook.deleteMany()
})