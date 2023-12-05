const tasteQuiz = {
    energy: "",
    genre: "",
    popularity: "",
    speechiness: ""
}

const nothing = [0]
const energyTaste = [0.2, 0.85, 1, 0.6, 0.35, 0];
const genreTaste = ['pop', 'country', 'r&b', 'latinpop', 'punk', 'indie'];
const popularityTaste = [100, 30, 10, 80, 60, 0];
const speechinessTaste = [0.15, 0.3, 0.6, 0.9, 0.5, 0.1]

const moodQuiz = {
    energy: "",
    genre: "",
    popularity: ""
}

const cityQuiz = {
    energy: "",
    valence: "",
    dance: "",
    tempo: "",
    popularity: "",
    speechiness: "",
    genre: ""
}

console.log("hello")
const backToHome = document.querySelector(".page-button-container");
console.log(backToHome)
backToHome.addEventListener("click", () => {
    console.log("clicked home")
    window.location.href = "index.html";
})

const tasteQOne = document.querySelector('#taste-question-1');
tasteQOne.addEventListener("mouseover", () => {
    console.log('question 1');
    hoverQuestion(tasteQOne);
})
const tasteQTwo = document.querySelector('#taste-question-2');
tasteQTwo.addEventListener("mouseover", () => {
    console.log('question 2');
    hoverQuestion(tasteQTwo, energyTaste);
})
const tasteQThree = document.querySelector('#taste-question-3');
tasteQThree.addEventListener("mouseover", () => {
    console.log('question 3');
    hoverQuestion(tasteQThree, genreTaste);
})
const tasteQFour = document.querySelector('#taste-question-4');
tasteQFour.addEventListener("mouseover", () => {
    console.log('question 4');
    hoverQuestion(tasteQFour, popularityTaste);
})
const tasteQFive = document.querySelector('#taste-question-5');
tasteQFive.addEventListener("mouseover", () => {
    console.log('question 5');
    const speechiness = hoverQuestion(tasteQFive, speechinessTaste);
    console.log(speechiness);
    tasteQuiz.speechiness = speechiness;
})

function hoverQuestion(divHover, keywordarray) {
    const tasteOne = divHover.querySelector('#taste-answer-1');
    const tasteTwo = divHover.querySelector('#taste-answer-2');
    const tasteThree = divHover.querySelector('#taste-answer-3');
    const tasteFour = divHover.querySelector('#taste-answer-4');
    const tasteFive = divHover.querySelector('#taste-answer-5');
    const tasteSix = divHover.querySelector('#taste-answer-6');
    tasteOne.addEventListener('click', ()=> {
        clickAnswer(tasteOne);
        console.log(keywordarray[0]);
        return keywordarray[0];
    })
    tasteTwo.addEventListener('click', () => {
        clickAnswer(tasteTwo);
        console.log(keywordarray[1]);
        return keywordarray[1];
    })
    tasteThree.addEventListener('click', () => {
        clickAnswer(tasteThree);
        return keywordarray[2];
    })
    tasteFour.addEventListener('click', () => {
        clickAnswer(tasteFour);
        return keywordarray[3];
    })
    tasteFive.addEventListener('click', () => {
        clickAnswer(tasteFive);
        return keywordarray[4];
    })
    tasteSix.addEventListener('click', () => {
        clickAnswer(tasteSix);
        return keywordarray[5];
    })
}

function clickAnswer(selectedItem) {
    const tasteQuestion = selectedItem.parentElement.querySelectorAll('div');
    tasteQuestion.forEach((div) => {
        if(div.classList.contains('currentAnswer')) {
            div.classList.remove('currentAnswer')
        }
    })
    selectedItem.classList.add('currentAnswer');
    tasteQuestion.forEach((div) => {
        div.classList.remove('notSelected');
        if (div.classList.contains('currentAnswer')) {
        } else {
            div.classList.add('notSelected');
        }
    })
}