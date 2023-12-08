const clientId = auth.clientId; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken; // = JSON.parse(localStorage.getItem('access_token') || false); // changed from "let accessToken;"
console.log("get access token " + accessToken)

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    accessToken = await getAccessToken(clientId, code);
    console.log("await access token " + accessToken)
    localStorage.setItem("access_token", JSON.stringify(accessToken)) // local storage token
    // accessToken = JSON.parse(localStorage.getItem("access_token"));
    const profile = await fetchProfile(accessToken);
    console.log(profile);
    populateUI(profile);
    printRecs(accessToken);
    console.log(accessToken);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/quizchoice");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/quizchoice");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    let accessToken = JSON.parse(localStorage.getItem('access_token')); // added
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` } // changed from "token"
    });

    return await result.json();
}

function populateUI(profile) {
    localStorage.setItem("username", JSON.stringify(profile.display_name))
    const userName = JSON.parse(localStorage.getItem("username") || false)
    const nameHeaders = document.querySelectorAll(".header-user-name")
    for (const nameHeader of nameHeaders) {
        console.log("NAME HEADER ----- " + nameHeader)
        nameHeader.innerText = userName // not working
    } 
    console.log("USERNAME " + userName)
    // document.getElementById("displayName").innerText = userName;
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(35, 35);
        profileImage.src = profile.images[0].url;
        profileImage.classList.add('header-user-photo');
        document.getElementById("avatar").append(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    // document.getElementById("id").innerText = profile.id;
    // document.getElementById("email").innerText = profile.email;
    // document.getElementById("uri").innerText = profile.uri;
    // document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    // document.getElementById("url").innerText = profile.href;
    // document.getElementById("url").setAttribute("href", profile.href);
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Evelyn's implementation 12/2/2023
async function printRecs(token) {
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    const result = await fetch("https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",{
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await result.json();
    console.log(data);
    return data;
}

// api call to get recommendations when get results button is pressed in taste.html
async function tasteRec(tasteArray) {
    const tasteURL = `https://api.spotify.com/v1/recommendations?seed_genres=${tasteArray[2]}&target_energy=${tasteArray[1]}&target_popularity=${tasteArray[3]}&target_speechiness=${tasteArray[4]}}`;
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    const result = await fetch(tasteURL, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}`}
    });
    const data = await result.json()
    return data;
}

// // api call to get recommendations when get results button is pressed in mood.html
// async function moodRec(moodArray) {
//     const moodURL = `https://api.spotify.com/v1/recommendations?seed_genres=${moodArray[1]}&target_energy=${moodArray[0]}&target_popularity=${moodArray[2]}`;
//     let accessToken = JSON.parse(localStorage.getItem('access_token'));
//     const result = await fetch(moodURL, {
//         method: "GET", headers: { Authorization: `Bearer ${accessToken}`}
//     });
//     const data = await result.json()
//     return data;
// }

// api call to get recommendations when get results button is pressed in city.html
async function cityRec(cityArray) {
    const cityURL = `https://api.spotify.com/v1/recommendations?seed_genres=${cityArray[4]}&target_energy=${cityArray[0]}&target_popularity=${cityArray[2]}&target_speechiness=${cityArray[3]}&target_tempo=${cityArray[1]}&target_valence=${cityArray[6]}`;
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    const result = await fetch(cityURL, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}`}
    });
    const data = await result.json()
    return data;
}

// // todo: create a function that parses through the recommendations and outputs an array with all of the track ids
// function parseRec(result) {
//     // dictionry -> "tracks" -> "id"
//     // ^ playlist_id required for adding song to playlist
//     const trackIds = []
//     for (const item in result["tracks"]) {
//         console.log(" ITEM IN result[tracks] ----- " + item)
//         const trackId = item["id"]
//         console.log(" ITEM'S ID = " + trackId)
//         trackIds.push(trackId);
//     }
//     return trackIds;

//     // delete when implementing
//     // return ['track_id_1', 'track_id_2'];
// }

// function creates a playlist and inputs all of the recommendations into new playlist
// async function createPlaylist(profile, recData) {
//     try {
//         // step 1: create playlist
//         const playlistName  = "Quizify's awesome playlist!";     // rename later
//         const result = await fetch(`https://api.spotify.com/v1/users/${profile.id}/playlists`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             }, body: JSON.stringify({
//                 name: playlistName,
//                 public: true // set false if you want this to be private
//             })
//         });
//         const playlistData = await createPlaylistResponse.json();
//         const playlistId = playlistData.id;

//         // step 2: add tracks to playlist
//         const tracks = parseRec(recData);
        
//         const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 uris: tracks.map(trackId => `spotify:track:${trackId}`)
//             })
//         });

//         const addedTracksData = await addTracksResponse.json();
//         console.log('Tracks added to playlist:', addedTracksData);
//         alert('Playlist created and tracks added successfully!');
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while creating the playlist');
//     }
// }