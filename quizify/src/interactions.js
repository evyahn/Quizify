
// back to home button -> index.html
const backToHome2 = document.querySelector(".home-button");
backToHome2.addEventListener("click", () => {
    window.location.href = "quizchoice.html";
})

// get results button -> generate result box
const getResultsButton = document.querySelector(".get-results-button");
const resultDiv = document.querySelector("result-container");
getResultsButton.addEventListener("click", () => {          // create diff ones for each quiz id?
    const title = resultDiv.createElement("h2");
    title.classList.add("result-title");
    title.innerText = "Result"
    resultDiv.append(title)

    const description = resultDiv.createElement("h3");
    description.classList.add("result-description");
    description.innerText = writeMoodResults(moodArray)   // need to link array to that
    resultDiv.append(description)

    const playlistButtonContainer = resultDiv.createElement("div");
    playlistButtonContainer.classList.add("playlist-button-container");
    resultDiv.append(playlistButton)

    const playlistButton = resultDiv.createElement("button");
    playlistButton.classList.add("playlist-button");
    playlistButton.append(playlistButton)                       // add id?

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

    const description = `For your taste, we have created a playlist with ${energyResult} energy 
                        and ${popularityResult} popularity. Here's a ${genre} mix that will suit your taste.`

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


    const description = `The city you should live in is ${city}! For your destination, we have created a playlist with ${energyResult} energy, 
                        ${tempoResult} result, and ${popularityResult} popularity. Here's a ${genre} mix for your new city.`

    return description
}