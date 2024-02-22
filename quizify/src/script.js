const clientId = auth.clientId; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken // = JSON.parse(localStorage.getItem('access_token') || false); // changed from "let accessToken;"

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    accessToken = await getAccessToken(clientId, code);
    localStorage.setItem("access_token", JSON.stringify(accessToken)) // local storage token
    // accessToken = JSON.parse(localStorage.getItem("access_token"));
    const profile = await fetchProfile(accessToken);
    localStorage.setItem("profile", JSON.stringify(profile)) // local storage token
    populateUI(profile);
    printRecs(accessToken);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    // params.append("redirect_uri", "http://localhost:5173/quizchoice");
    params.append("redirect_uri", "https://evyahn.github.io/Quizify/quizify/quizchoice");
    params.append("scope", "user-read-private user-read-email playlist-modify-public");
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
    // params.append("redirect_uri", "http://localhost:5173/quizchoice");
    params.append("redirect_uri", "https://evyahn.github.io/Quizify/quizify/quizchoice");
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
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` } 
    });

    return await result.json();
}

function populateUI(profile) {
    localStorage.setItem("username", JSON.stringify(profile.display_name))
    const userName = JSON.parse(localStorage.getItem("username") || false)
    const nameHeaders = document.querySelectorAll(".header-user-name")
    for (const nameHeader of nameHeaders) {
        nameHeader.innerText = userName;
    } 
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(35, 35);
        profileImage.src = profile.images[0].url;
        profileImage.classList.add('header-user-photo');
        document.getElementById("avatar").append(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
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
    return data;
};