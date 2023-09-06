const endpoint = "http://localhost:3000";


// ---------------------filter and Sort games-----------------------//

function inputSearchChanged(event) {
    const value = event.target.value;
    const artistsToShow = searchArtists(value);
    displayArtist(artistsToShow);
}

const searchArtists = (searchValue) => {
    searchValue = searchValue.toLowerCase();

    return artists.filter((artist) => artist.title.toLowerCase().includes(searchValue));
};

function sortBy(event) {
    const selectedValue = event.target.value;

    if (selectedValue === "title") {
        artists.sort((artist1, artist2) => artist1.title.localeCompare(artist2.title));
    } else if (selectedValue === "genres") {
        artists.sort((artist1, artist2) => artist1.title.localeCompare(artist2.title));
    }

    displayArtist(artists);
}



export { endpoint, sortBy, inputSearchChanged, searchArtists };