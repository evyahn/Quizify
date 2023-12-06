const tasteQuiz = {
    energy: "",
    genre: "",
    popularity: "",
    speechiness: ""
}

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

// Taste: Question 1

const tasteOne = document.querySelector('#taste-answer-1');
tasteOne.addEventListener('click', () => {
    clickAnswer(tasteOne);
});

const tasteTwo = document.querySelector('#taste-answer-2');
tasteTwo.addEventListener('click', () => {
    clickAnswer(tasteTwo);
});

const tasteThree = document.querySelector('#taste-answer-3');
tasteThree.addEventListener('click', () => {
    clickAnswer(tasteThree);
})

const tasteFour = document.querySelector('#taste-answer-4');
tasteFour.addEventListener('click', () => {
    clickAnswer(tasteFour);
})

const tasteFive = document.querySelector('#taste-answer-5');
tasteFive.addEventListener('click', () => {
    clickAnswer(tasteFive);
    tasteQuiz.energy = '0.7';
})

const tasteSix = document.querySelector('#taste-answer-6');
tasteSix.addEventListener('click', () => {
    clickAnswer(tasteSix);
    tasteQuiz.energy = '0.7';
})

// Taste: Question 2

const tasteSeven = document.querySelector('#taste-answer-7');
tasteSeven.addEventListener('click', () => {
    tasteQuiz.energy = '0.2';
    clickAnswer(tasteSeven);
})

const tasteEight = document.querySelector('#taste-answer-8');
tasteEight.addEventListener('click', () => {
    tasteQuiz.energy = '0.85';
    clickAnswer(tasteEight);
})

const tasteNine = document.querySelector('#taste-answer-9');
tasteNine.addEventListener('click', () => {
    tasteQuiz.energy = '1';
    clickAnswer(tasteNine);
})

const tasteTen = document.querySelector('#taste-answer-10');
tasteTen.addEventListener('click', () => {
    tasteQuiz.energy = '0.6';
    clickAnswer(tasteTen);
})

const tasteEleven = document.querySelector('#taste-answer-11');
tasteEleven.addEventListener('click', () => {
    tasteQuiz.energy = '0.35';
    clickAnswer(tasteEleven);
})

const tasteTwelve = document.querySelector('#taste-answer-12');
tasteTwelve.addEventListener('click', () => {
    tasteQuiz.energy = '0';
    clickAnswer(tasteTwelve);
})

// Taste: Question 3



function clickAnswer(selectedItem) {
    const tasteQuestion = selectedItem.parentElement.querySelectorAll('div');
    tasteQuestion.forEach((div) => {
        if(div.classList.contains('currentAnswer')) {
            div.classList.remove('currentAnswer')
        }
    })
    console.log(tasteQuiz);
    selectedItem.classList.add('currentAnswer');
    tasteQuestion.forEach((div) => {
        div.classList.remove('notSelected');
        if (div.classList.contains('currentAnswer')) {
        } else {
            div.classList.add('notSelected');
        }
    })
}