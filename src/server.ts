import { app } from "./app.js";
import "dotenv/config"

app.listen(3333 , "0.0.0.0", () => {
    console.log("Server is listening...")
})