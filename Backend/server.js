import express, { response } from "express";
import cors from "cors"
import fs from "fs/promises"
import { request } from "http";

const app = express();

app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    console.log(`serveren kører på http://localhost:3000`);
});

app.get("/", async (request, response) => {
    response.send("Hello my brother");
});
app.get("/artists", async (request, response) => {
    const data = await fs.readFile("artists.json");
    const users = JSON.parse(data);
    response.json(users);
});

app.get("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);

    const result = artists.find(artist => artist.id === id);

    if (!result)
    {
        response.status(404).json("artist not found")
    } else {
        response.json(result)
    }
} )

app.post("/artists", async (request, response) => {
    const newArtist = request.body; //Tager imod informationen fra den nye artist
    newArtist.id = new Date().getTime(); //Giver den et unikt ide
    const data = await fs.readFile("artists.json"); //Læser dataen af artist filen
    const artists = JSON.parse(data); //Konvertere det til js objekter
    artists.push(newArtist); //pusher den nye artist ind i artists listen
    fs.writeFile("artists.json", JSON.stringify(artists, null, 2)); //konvertere det tilbage til json
    response.json(artists);//sender så artists som response
});

app.put("/artists/:id", async (request, response) => {
    const id = Number(request.params.id); //Finder id
    const data = await fs.readFile("artists.json"); //læser Json filen
    const artists = JSON.parse(data); //konvertere til js objekter
    let artistToUpdate = artists.find((artist) => artist.id === id); //Finder hvilken artist der skal opdateres udfra id
   
    const body = request.body;

    artistToUpdate.name = body.name;
    artistToUpdate.birthday = body.birthday;
    artistToUpdate.activeSince = body.activeSince;
    artistToUpdate.genres = body.genres;
    artistToUpdate.labels = body.labels;
    artistToUpdate.website = body.website;
    artistToUpdate.image = body.image;
    artistToUpdate.shortDescription = body.shortDescription;
    //^^ opdatere artist

    fs.writeFile("artists.json", JSON.stringify(artists)); //konvertere det tilbage til json
    response.json(artists); //sender så artists som response
})

app.delete("/artists/:id", async (request, response) => {
    const id = Number(request.params.id);
    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);

    const newArtists = artists.filter(artist => artist.id !== id);
    fs.writeFile("artists.json", JSON.stringify(newArtists));

    response.json(newArtists)
})

// -------------Favorite------------//

app.put("/artists/:id/favorite", async (request, response) => {
    const id = Number(request.params.id);
    const data = await fs.readFile("artists.json");
    const artists = JSON.parse(data);

    // Find the artist with the matching ID
    const artistToUpdate = artists.find((artist) => artist.id === id);

    if (!artistToUpdate) {
        response.status(404).json({ message: "Artist not found" });
    } else {
        const body = request.body;

        // Update the favorite property if provided in the request body
        if (typeof body.favorite === "boolean") {
            artistToUpdate.favorite = body.favorite;
        } else {
            response.status(400).json({ message: "Invalid request body" });
            return;
        }

        // Write the updated data back to the JSON file
        await fs.writeFile("artists.json", JSON.stringify(artists, null, 2));

        console.log("succesfully favorited")
        // Respond with the updated artist data
        response.json(artistToUpdate);
    }
});





