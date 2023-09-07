
import { displayArtists, artists } from "./script.js";

// ---------------------filter and Sort games-----------------------//

function inputSearchChanged(event) {
    const value = event.target.value;
    const artistsToShow = searchArtists(value);
    displayArtists(artistsToShow);
}

function searchArtists(searchValue) {
    console.log(searchValue);
    searchValue = searchValue.toLowerCase();
    const results = artists.filter((artist) => artist.name.toLowerCase().includes(searchValue));
    return results;
}

function sortBy(event) {
    const selectedValue = event.target.value;

    if (selectedValue === "name") {
        artists.sort((artist1, artist2) => artist1.name.localeCompare(artist2.name));
    } else if (selectedValue === "genres") {
        artists.sort((artist1, artist2) => artist1.genres.localeCompare(artist2.genres));
    }

    displayArtists(artists);
}

function filterArtistsChanged(event) {
    const value = event.target.value;
    console.log(value);
    const ArtistsToShow = filterArtists(value);
    console.log(ArtistsToShow);
    displayArtists(ArtistsToShow);
}

function filterArtists(filterSelected) {
    console.log(filterSelected);
    if (filterSelected === "favorites") {
        return artists.filter((artist) => artist.favorite === true);
    } else {
        return artists;
    }
}


export { sortBy, inputSearchChanged, filterArtistsChanged };