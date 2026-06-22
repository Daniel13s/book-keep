import { beforeAll, expect, test } from "vitest";
import request from "supertest"
import { app } from "../../../app.js";
import { before } from "node:test";
import { prisma } from "../../../infra/prisma.js";

beforeAll(async () => {
    await prisma.user.deleteMany()
})
test("should register a user.", async () => {
    const response = await request(app)
        .post("/auth")
        .send({
            name: "Daniel Silva",
            email: "eudandev@gmail.com",
            password: "eudandev25"
        })

        expect(response.status).toBe(201)
})
test("should log in a user.", async () => {
    const response = await request(app)
        .get("/auth")
        .send({
            email: "eudandev@gmail.com",
            password: "eudandev25"
        })

        expect(response.status).toBe(200)
})