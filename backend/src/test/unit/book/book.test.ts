import { expect, test } from "vitest";
import { makeSutService } from "../service/service.unit.js";

test("should create a book.", async () => {
    const {serviceBookCreate} = makeSutService()

    const data = {
        id: "primeiro",
        title: "harry potter",
        description: "livro bem legal, de verdade"
    }

    const response = await serviceBookCreate.execute(data)

    expect(response).toBeTruthy()
})

test("should update a book", async () => {
    const {serviceBookUpdate, serviceBookCreate} = makeSutService()

    const data2 = {
        id: "primeiro",
        title: "harry potter",
        description: "livro bem legal, de verdade"
    }

    const book = await serviceBookCreate.execute(data2)

    const data = {
        title: "harry potter 2",
        description: "livro bem mais legal"
    }

    const response = await serviceBookUpdate.execute("primeiro", data)

    expect(response).toBeTruthy
})