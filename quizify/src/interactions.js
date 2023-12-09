const profile = JSON.parse(localStorage.getItem('profile'));
const accessToken = JSON.parse(localStorage.getItem('access_token'));
console.log("Access Token = " + accessToken)

// back to home button -> index.html
const backToHome2 = document.querySelector(".home-button");
backToHome2.addEventListener("click", () => {
    window.location.href = "quizchoice.html";
})

async function moodRec(moodArray) {
    const moodURL = `https://api.spotify.com/v1/recommendations?seed_genres=${moodArray[1]}&target_energy=${moodArray[0]}&target_popularity=${moodArray[2]}`;
    const result = await fetch(moodURL, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}`}
    });
    const data = await result.json()
    return data;
}

// todo: create a function that parses through the recommendations and outputs an array with all of the track ids
function parseRec(result) {
    // dictionry -> "tracks" -> "id"
    // ^ playlist_id required for adding song to playlist
    const trackNames = [];
    const trackIds = [];
    console.log(result);
    for (const item in result.tracks) {
        console.log(item);
        // console.log(" ITEM IN result[tracks] ----- " + item)
        const trackId = result.tracks[item].id;
        const trackName = result.tracks[item].name;
        trackNames.push(trackName);
        console.log("TRACK NAMES ----------- " + trackNames);
        // console.log(" ITEM'S ID = " + trackId)
        trackIds.push(trackId);
    }
    console.log(trackIds);
    return trackIds;

    // delete when implementing
    // return ['track_id_1', 'track_id_2'];
}

async function createPlaylist(profile, recData) {
    try {
        // step 1: create playlist
        console.log("PROFILE ID -------- " + profile.id)
        console.log("ACCESS TOKEN = " + accessToken)
        const playlistName  = "Quizify's awesome playlist!!!";     // rename later
        const result = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }, body: {
                name: playlistName,
                public: true // set false if you want this to be private
            }
        });
        const playlistData = await result.json();
        const playlistId = playlistData.id;
        console.log("PLAYLIST ID ----------- " + playlistId)

        // step 2: add tracks to playlist
        const tracks = parseRec(recData);
        
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: tracks.map(trackId => `spotify:track:${trackId}`)
            })
        });

        const addedTracksData = await addTracksResponse.json();
        console.log('Tracks added to playlist:', addedTracksData);
        alert('Playlist created and tracks added successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the playlist');
    }
}

// get results button -> generate result box
const resultsButton = document.querySelector(".get-results-button");
const resultDiv = document.querySelector(".result-container")
let resultsState = false;
resultsButton.addEventListener("click", () => { 
    if (resultsState === false) {

    let moodArray = false;
    let tasteArray = false;
    let cityArray = false;

    const title = document.createElement("h2");
    title.classList.add("result-title");
    title.innerText = "Results"
    resultDiv.append(title);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("result-details");
    resultDiv.append(detailsDiv);

    if (resultsButton.classList.contains("mood")) {
        const moodDescription = document.createElement("h3");
        moodDescription.classList.add("result-description");
        moodDescription.innerText = writeMoodResults(moodQuizArray) 
        moodArray = moodQuizArray
        detailsDiv.append(moodDescription)
    }

    if (resultsButton.classList.contains("taste")) {
        const tasteDescription = document.createElement("h3");
        tasteDescription.classList.add("result-description");
        tasteDescription.innerText = writeTasteResults(tasteQuizArray) 
        tasteArray = tasteQuizArray
        detailsDiv.append(tasteDescription)
    }

    if (resultsButton.classList.contains("city")) {
        const cityDescription = document.createElement("h3");
        cityDescription.classList.add("result-description");
        cityDescription.innerText = writeCityResults(cityQuizArray) 
        cityArray = cityQuizArray
        detailsDiv.append(cityDescription)
    }
    
    const playlistButtonContainer = document.createElement("div");
    playlistButtonContainer.classList.add("playlist-button-container");
    detailsDiv.append(playlistButtonContainer)

    const playlistButton = document.createElement("button");
    playlistButton.classList.add("playlist-button");
    playlistButton.innerText = "Get Playlist"
    playlistButtonContainer.append(playlistButton) 
    
    resultsState = true;        // creates only one result box

    // -------------------- WORKING ON THIS RNNNNN ---------------------------
    playlistButton.addEventListener("click", async () => {
        if (Array.isArray(moodArray)) {
            console.log("clicked")
            const data = await moodRec(moodArray);
            console.log("DATA ---------------- ", data);
            console.log(data);
            const tracks = parseRec(data);
            createPlaylist(profile, tracks);
            // } catch (error) {
            // console.error("Error occurred:", error);
            // // Handle errors here if needed
        } else if (Array.isArray(tasteArray)) {
            const data = tasteRec(tasteArray);
            const tracks = parseRec(data);
            // createPlaylist(profile, tracks);
        } else if (Array.isArray(cityArray)) {
            const data = cityRec(cityArray);
            const tracks = parseRec(data);
            // createPlaylist(profile, tracks);
        }
        });
        // if (Array.isArray(moodArray)) {
        //     const recs = async () => {
        //         console.log("clicked")
        //         data = await moodRec(moodArray);
        //         console.log("DATA ---------------- " + data)
        //         const tracks = parseRec(data);
        //         createPlaylist(profile, tracks);
        //     }

        // const data = moodRec(moodArray);
        // const tracks = parseRec(data);
        // createPlaylist(profile, tracks);

    //     }
    //     else if (Array.isArray(tasteArray)) {
    //         const data = tasteRec(tasteArray);
    //         const tracks = parseRec(data);
    //         createPlaylist(profile, tracks);
    //     }
    //     else if (Array.isArray(cityArray)) {
    //         const data = cityRec(cityArray);
    //         const tracks = parseRec(data);
    //         createPlaylist(profile, tracks);
    //     }
        
    // })

    };    
})



// header logo -> quizchoice page
const logoButton = document.querySelector(".header-logo");
logoButton.addEventListener("click", () => {
    window.location.href = "quizchoice.html";
})


function writeMoodResults(moodArray) {
    // mood array: energy (0-1), genre, popularity (0-100)
    const energy = moodArray[0]
    let energyResult = "low"
    if (energy >= 0.5) {
        energyResult = "high"
    }
    const genre = moodArray[1]
    const popularity = moodArray[2]
    let popularityResult = "low"
    if (popularity >= 50) {
        popularityResult = "high"
    }
    const description = `For you, we have created a playlist with ${energyResult} energy 
                        and ${popularityResult} popularity. Here's a ${genre} mix that will suit your mood.`
    return description
}

function writeTasteResults(tasteArray) {
    // taste array: none, energy (0-1), genre, popularity (0-100), speechiness (0-1)
    const energy = tasteArray[1]
    let energyResult = "low"
    if (energy >= 0.5) {
        energyResult = "high"
    }
    const genre = tasteArray[2];
    const popularity = tasteArray[3]
    let popularityResult = "low"
    if (popularity >= 50) {
        popularityResult = "high"
    };
    const description = `For you, we have created a playlist with ${energyResult} energy 
                        and ${popularityResult} popularity. Here's a ${genre} mix created for your taste.`
    return description
}

function writeCityResults(cityArray) {
    // city array: energy (0-1), tempo, popularity (0-100), speechiness (0-1), genre, valence
    const energy = cityArray[0]
    let energyResult = "low"
    if (energy >= 0.5) {
        energyResult = "high"
    }
    const tempo = cityArray[1]
    let tempoResult = "slow"
    let city;
    if (tempo >= 75) {
        city = "Anchorage, AK"
    } else if (tempo >= 90) {
        city = "Nashville, TN"
    } else if (tempo >= 109) {
        city = "Denver, CO"
    } else if (tempo >= 120) {
        city = "Portland, OR"
    } else if (tempo >= 120) {
        city = "Portland, OR"
        tempoResult = "fast"
    } else if (tempo >= 140) {
        city = "Charleston NC"
    } else {
        city = "Phoenix, AZ"
    }
    const popularity = cityArray[2]
    let popularityResult = "low"
    if (popularity >= 50) {
        popularityResult = "high"
    };
    const genre = cityArray[4];
    const description = `The city you should live in is ${city}! For your destination, we have created a playlist with ${energyResult} energy,  ${tempoResult} tempo, and ${popularityResult} popularity. Here's a ${genre} mix for your new city.`
    return description
}