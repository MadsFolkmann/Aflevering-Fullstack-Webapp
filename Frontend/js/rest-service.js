const endpoint = "http://localhost:3000";

export { endpoint, getArtists, prepareArtistData, createArtist, updateArtist, deleteArtist };

async function getArtists() {
    const response = await fetch(`${endpoint}/artists`); // fetch request, (GET)
    const data = await response.json(); // parse JSON to JavaScript
    const artists = prepareArtistData(data);
    return artists;
}

async function prepareArtistData(dataObject) {
    const artistArray = [];
    for (const key in dataObject) {
        const artists = dataObject[key];
        artistArray.push(artists);
    }
    return artistArray;
}

async function createArtist(image, name, birthdate, activeSince, genres, labels, website, shortDescription) {
    const newArtist = {
        name: name,
        image: image,
        birthdate: birthdate,
        activeSince: activeSince,
        genres: genres,
        labels: labels,
        website: website,
        shortDescription: shortDescription,
        favorite:false
    };
    const artistAsJson = JSON.stringify(newArtist);

    const response = await fetch(`${endpoint}/artists`, {
        method: "POST",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
}

async function updateArtist(id, image, name, birthdate, activeSince, genres, labels, website, shortDescription) {
    const updatedArtist = {
        image: image,
        name: name,
        birthdate: birthdate,
        activeSince: activeSince,
        genres: genres,
        labels: labels,
        website: website,
        shortDescription: shortDescription
    };

    const artistAsJson = JSON.stringify(updatedArtist);
    const response = await fetch(`${endpoint}/artists/${id}`, {
        method: "PUT",
        body: artistAsJson,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
}

async function deleteArtist(id) {
    console.log("hey")
    const response = await fetch(`${endpoint}/artists/${id}`, {
        method: "DELETE",
    });
    return response;
}
