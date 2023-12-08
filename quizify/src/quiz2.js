// energy, genre, popularity, speechiness
const tasteQuizArray = [];
const tasteMeaning = [
    false,
    [0.2, 0.85, 1, 0.6, 0.35, 0],
    ['pop', 'country', 'r-n-b', 'latin', 'punk-rock', 'indie'], // or "latino"
    [100, 30, 10, 80, 60, 0],
    [0.15, 0.3, 0.6, 0.9, 0.5, 0.1]
]

// energy, genre, popularity
const moodQuizArray = [];
const moodMeaning = [
    [0.8, 0.25, 0, 0.4, 1, 0.6],
    ['pop', 'edm', 'folk', 'indie-pop', 'chill', 'rock'], // no lofi
    false
]

// energy, tempo, popularity, speechiness, genre, valence
const cityQuizArray = [];
const cityMeaning = [
    [0.6, 0.7, 0.8, 0.3, 0.2, 1],
    [90, 109, 140, 75, 160, 120],
    [30, 100, 50, 35, 80, 0],
    [0.9, 1, 0.2, 0.5, 0.35, 0.7],
    ['emo', 'r-n-b', 'folk', 'indie', 'country', 'happy'], // no surfrock
    [2, 7, 3, 5, 10, 0]
]

const answerContainers = document.querySelectorAll('.answer-container');

for (const answerContainer of answerContainers) {
    answerContainer.addEventListener('click', () => {
        const questionContainer = answerContainer.parentElement;
        const gridContainer = questionContainer.parentElement;
        console.log(gridContainer);

        const tasteQuestions = questionContainer.querySelectorAll('.answer-container');
        tasteQuestions.forEach((div) => {
            if(div.classList.contains('currentAnswer')) {
                div.classList.remove('currentAnswer')
            }
            div.classList.add('notSelected');
        });
        answerContainer.classList.add('currentAnswer');
        answerContainer.classList.remove('notSelected');

        const questions = gridContainer.querySelectorAll('.question-container');
        
        const childIndex = Array.from(tasteQuestions).indexOf(answerContainer);
        const questionIndex = Array.from(questions).indexOf(questionContainer);

        console.log(`Question ${questionIndex}, Answer ${childIndex}`);
        // if(tasteMeaning[questionIndex]) {
        //     tasteQuizArray[questionIndex] = tasteMeaning[questionIndex][childIndex];
        // }
        
        if (gridContainer.classList.contains('taste')) {
            if(tasteMeaning[questionIndex]) {
                tasteQuizArray[questionIndex] = tasteMeaning[questionIndex][childIndex];
            }
            console.log(tasteQuizArray);
        }  else if (gridContainer.classList.contains('mood')) {
            if(moodMeaning[questionIndex]) {
                moodQuizArray[questionIndex] = moodMeaning[questionIndex][childIndex];
            }
            console.log(moodQuizArray);
        } else {
            if(cityMeaning[questionIndex]) {
                cityQuizArray[questionIndex] = cityMeaning[questionIndex][childIndex];
            }
            console.log(cityQuizArray);
        }

    });
}

const slider = document.querySelector('.slider');
slider.addEventListener('input', () => {
    moodQuizArray[2] = slider.value;
    console.log(moodQuizArray);
});


// CALLS FOR RECOMMENDATIONS WHEN GET PLAYLIST BUTTON IS PRESSED 

// const tasteResultDiv = document.querySelector("#taste-playlist-button"); // why are all of these null ?????????
// console.log("taste result -------- " + tasteResultDiv)                  // not printing...........
// tasteResultDiv.addEventListener("click", () => {
//     console.log("clicked taste result button");
//     const data = tasteRec(tasteQuizArray);
//     const tracks = parseRec(data);
//     createPlaylist(profile, tracks);
// })

// const moodResult = document.querySelector("#mood-playlist-button"); 
// console.log("mood result -------- " + moodResult)
// moodResult.addEventListener("click", (moodArray, profile) => {
//     console.log("clicked mood result button");
//     console.log(" MOOD QUIZ ARRAY ---------- " + moodQuizArray)
//     const data = moodRec(moodQuizArray);
//     console.log(" DATA ---------- " + data)
//     const tracks = parseRec(data);
//     // createPlaylist(profile, tracks);
// })

// const cityResult = document.querySelector("#city-playlist-button");
// cityResult.addEventListener("click", (cityArray, profile) => {
//     console.log("clicked city result button")
//     const data = cityRec(cityQuizArray);
//     const tracks = parseRec(data);
//     createPlaylist(profile, tracks);
// })