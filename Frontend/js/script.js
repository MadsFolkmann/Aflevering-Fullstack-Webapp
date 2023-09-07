"use strict"

import { endpoint, getArtists, createArtist, updateArtist, deleteArtist } from "./rest-service.js";
import { sortBy, inputSearchChanged, filterArtistsChanged } from "./helpers.js";

let artists;
endpoint;
window.addEventListener("load", initApp);

function initApp() {
    console.log("VELKOMMEN TIL Artist Galore");
    updateGrid();

    //Create//
    document.querySelector("#btn-create-artist").addEventListener("click", showCreateModal);

    //Delete//
    document.querySelector("#form-delete-artist").addEventListener("submit", deleteArtistClicked);
    document.querySelector("#form-delete-artist .btn-cancel").addEventListener("click", deleteArtistClickedNo);

    //Update//
    document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);

    // //Sort - Search - filter//
    document.querySelector("#sort-artists").addEventListener("change", sortBy);

    document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
    document.querySelector("#input-search").addEventListener("search", inputSearchChanged);

    document.querySelector("#filter-artists").addEventListener("change", filterArtistsChanged);

}

//----------------------Games-----------------------//


function displayArtists(listOfArtists) {
    document.querySelector("#artists").innerHTML = "";
    for (const artist of listOfArtists) {
        showArtists(artist);
    }
}

function showArtists(artistObject) {
    if (artistObject.favorite === false) {
        const html = /*html*/ `
        <article class="grid-item">
        <img src= "${artistObject.image}"/>
        <div class="grid-info">
        <h2 class="name">${artistObject.name}</h2>
        <p>${artistObject.genres}</p>
        </div>
        <div class="btns">
        <button class="btn-update">Update</button>
        <button class="btn-delete">Delete</button>
        </div>
        <div>
        <button class="btn-favorite" >❤</button>
        </div>
        </article>
      `;
      document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
    } else {
                const html = /*html*/ `
        <article class="grid-item">
        <img src= "${artistObject.image}"/>
        <div class="grid-info">
        <h2 class="name">${artistObject.name}</h2>
        <p>${artistObject.genres}</p>
        </div>
        <div class="btns">
        <button class="btn-update">Update</button>
        <button class="btn-delete">Delete</button>
        </div>
        <div>
        <button class="btn-favorite" style="background-color:red" >❤</button>
        </div>
        </article>
      `;
                document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
    }

    document.querySelector("#artists article:last-child .btn-update").addEventListener("click", (event) => {
        event.stopPropagation();
        updateClicked(artistObject);
    });
    document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", (event) => {
        event.stopPropagation();
        deleteClicked(artistObject);
    });
    document.querySelector("#artists article:last-child .btn-favorite").addEventListener("click", (event) => {
        event.stopPropagation();
        // tjekker status på objektet
        const isFavorite = artistObject.favorite;
        // Kalder den rigtige funktion
        if (isFavorite) {
            removeFromFavorites(artistObject.id);
        } else {
            markAsFavorite(artistObject.id);
        }
    });

    document.querySelector("#artists article:last-child").addEventListener("click", () => artistClicked(artistObject));

 
}
// ---------------------Create game-----------------------//

function showCreateModal() {
    const dialog = document.querySelector("#dialog-create-artist");

    dialog.showModal();

    document.querySelector("#createArtist").addEventListener("submit", createArtistClicked);

    dialog.querySelector(".close").addEventListener("click", () => {
        dialog.close();
    });
}

async function createArtistClicked(event) {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const birthdate = form.birthdate.value;
    const image = form.image.value;
    const activeSince = form.activeSince.value;
    const genres = form.genres.value;
    const labels = form.labels.value;
    const website = form.website.value;
    const shortDescription = form.shortDescription.value;

    const response = await createArtist(image, name, birthdate, activeSince, genres, labels, website, shortDescription);

    if (response.ok) {
        form.reset();
        updateGrid();
    }
    document.querySelector("#dialog-create-artist").close();
}
// createArtist();

//----------------Update Grid---------------//

async function updateGrid() {
    artists = await getArtists();
    displayArtists(artists);
}


//-------------------Show Dialog----------------------//

function artistClicked(artistObject) {
    console.log("Detail view opened");
    showDialog(artistObject);
    document.querySelector("#dialog-show-artist").showModal();
}

function showDialog(artistObject) {
    const dialogContent = document.querySelector("#dialog-artist-info");

     dialogContent.innerHTML = ""; //Clear alt indhold fra før
    const html = /*html*/ `
    <figure><img id="artist-image" src="${artistObject.image}"/></figure>
      <article id="all-written-info">
        <h2 id="artist-name">${artistObject.name}</h2>
        <h3>About him:</h3><p id="artist-shortDescription">${artistObject.name} was born ${artistObject.birthdate}. ${artistObject.shortDescription}. He's been active since ${artistObject.activeSince}.</p>
        <h3>Genres</h3><p id="artist-genres">${artistObject.genres}</p>
        <h3>Labels</h3><p id="artist-labels">${artistObject.labels}</p>
         <h3>Website</h3><p id="artist-website">${artistObject.website}</p>
      </article>
    `;
    dialogContent.insertAdjacentHTML("beforeend", html);

    
}

//-------------------Update and Delete----------------------//

//update
function updateClicked(artistObject) {
    console.log("Update button clicked");
    const updateForm = document.querySelector("#form-update-artist");
    const dialog = document.querySelector("#dialog-update-artist");
    console.log(artistObject)
    updateForm.name.value = artistObject.name;
    updateForm.image.value = artistObject.image;
    updateForm.birthdate.value = artistObject.birthdate;
    updateForm.activeSince.value = artistObject.activeSince;
    updateForm.genres.value = artistObject.genres;
    updateForm.labels.value = artistObject.labels;
    updateForm.website.value = artistObject.website;
    updateForm.shortDescription.value = artistObject.shortDescription;
    console.log(artistObject.id)
    updateForm.setAttribute("data-id", artistObject.id); 
    dialog.showModal();

    //Closes dialog on x click
    dialog.querySelector(".close").addEventListener("click", () => {
        dialog.close();
        console.log("Update view closed");
    });
}

async function updateArtistClicked(event) {
    console.log("Update button clicked");
    console.log(event.target.id)
    event.preventDefault();
    const form = event.target;
    const id = event.target.getAttribute("data-id");

    const name = form.name.value;
    const birthdate = form.birthdate.value;
    const image = form.image.value;
    const activeSince = form.activeSince.value;
    const genres = form.genres.value;
    const labels = form.labels.value;
    const website = form.website.value;
    const shortDescription = form.shortDescription.value;

    const response = await updateArtist(id, image, name, birthdate, activeSince, genres, labels, website, shortDescription); 
    if (response.ok) {
        updateGrid();

        updateArtist(id, image, name, birthdate, activeSince, genres, labels, website, shortDescription);
    }
    document.querySelector("#dialog-update-artist").close();
}


function deleteClicked(artistObject) {
    console.log("Delete button clicked");
    document.querySelector("#name-of-the-artist").textContent = artistObject.name;
    document.querySelector("#form-delete-artist").setAttribute("data-id", artistObject.id);
    document.querySelector("#dialog-delete-artist").showModal();
}

async function deleteArtistClicked(event) {
    console.log(event);
    const id = event.target.getAttribute("data-id");
    console.log(id)
    const response = await deleteArtist(id);
    if (response.ok) {
        deleteArtist(id);
        updateGrid();
    }
    document.querySelector("#dialog-delete-artist").close();
}

function deleteArtistClickedNo() {
    console.log("Close delete dialog");
    document.querySelector("#dialog-delete-artist").close();
}


//-----------------------Favorite----------------------//

function markAsFavorite(artistId) {
    console.log("Markér som favorit kaldt med artistId:", artistId);
    // Send en HTTP-anmodning for at markere artist som favorit
    fetch(`${endpoint}/artists/${artistId}/favorite`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: true }), // Sæt favorit til true
    })
        .then((response) => response.json())
        .then((updatedArtists) => {
            // Håndter svaret og opdater brugergrænsefladen om nødvendigt
            console.log(updatedArtists);
        })
        .catch((error) => {
            console.error("Fejl:", error);
        });
}

function removeFromFavorites(artistId) {
    console.log("Fjern fra favoritter kaldt med artistId:", artistId);
    // Send en HTTP-anmodning for at fjerne artist fra favoritter
    fetch(`${endpoint}/artists/${artistId}/favorite`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: false }), // Sæt favorit til false
    })
        .then((response) => response.json())
        .then((updatedArtists) => {
            // Håndter svaret og opdater brugergrænsefladen om nødvendigt
            console.log(updatedArtists); 
        })
        .catch((error) => {
            console.error("Fejl:", error);
        });
}


//-------Refresh ved click af IGDB-------//
const artistImg = document.querySelector("#artist-img");

artistImg.addEventListener("click", () => {
    location.reload();
});


export {displayArtists, artists}
