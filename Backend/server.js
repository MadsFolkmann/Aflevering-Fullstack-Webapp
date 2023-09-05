import express from "express";
import cors from "cors"
import fs from "fs/promises"
const app = express();
app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    console.log(`serveren kører på http://localhost:3000`);
});

app.get("/artists", async (request, response) => {
    const data = await fs.readFile("artister.json");
    const users = JSON.parse(data);
    response.json(users);
});