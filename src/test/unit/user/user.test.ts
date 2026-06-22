import { expect, test } from "vitest";
import { makeSutService } from "../service/service.unit.js";

test("should register a user", async() => {
    const {serviceUserRegister} = makeSutService()

    const response = await serviceUserRegister.execute("Dnaielzin", "dansilvad254@gmail.com", "DanielSilva254")

    expect(response).toBeTruthy()
})
test("It should log a user in.", async () => {
    const {serviceUserLogin, serviceUserRegister} = makeSutService()

    const user = await serviceUserRegister.execute("Danielzin", "dansilvad254@gmail.com", "DanielSilva254")

    const response = await serviceUserLogin.execute("dansilvad254@gmail.com", "DanielSilva254")
    
    expect(response).toBeTruthy()
})