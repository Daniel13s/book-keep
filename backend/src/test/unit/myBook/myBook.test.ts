import { expect, test } from "vitest";
import { makeSutService } from "../service/service.unit.js";

test("should create a myBook.", async () => {
    const {serviceMyBookCreate} = makeSutService()

    const response = await serviceMyBookCreate.execute("primeiro", "DanielzinLegal")

    expect(response).toBeTruthy()
})
test("should update a myBook.", async () => {
    const {serviceMyBookRead, serviceMyBookCreate} = makeSutService()

    const createBook = await serviceMyBookCreate.execute("primeiro", "Danielzin")

    const response = await serviceMyBookRead.execute("primeiro", "FECHADO")

    expect(response).toBeTruthy()
})