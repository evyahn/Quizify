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

const tasteOne = document.querySelector('#taste-answer-1');
tasteOne.addEventListener('click', () => {
    clickAnswer(tasteOne);
    tasteQuiz.energy = '0.2';
});

const tasteTwo = document.querySelector('#taste-answer-2');
tasteTwo.addEventListener('click', () => {
    clickAnswer(tasteTwo);
    tasteQuiz.energy = '0.4';
});

const tasteThree = document.querySelector('#taste-answer-3');
tasteThree.addEventListener('click', () => {
    clickAnswer(tasteThree);
    tasteQuiz.energy = '0.7';
})

const tasteFour = document.querySelector('#taste-answer-4');
tasteFour.addEventListener('click', () => {
    clickAnswer(tasteFour);
    tasteQuiz.energy = '0.7';
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

function clickAnswer(selectedItem) {
    const tasteQuestion = selectedItem.parentElement.querySelectorAll('div');
    tasteQuestion.forEach((div) => {
        if(div.classList.contains('currentAnswer')) {
            div.classList.remove('currentAnswer')
        }
    })
    console.log(selectedItem);
    selectedItem.classList.add('currentAnswer');
    tasteQuestion.forEach((div) => {
        div.classList.remove('notSelected');
        if (div.classList.contains('currentAnswer')) {
        } else {
            div.classList.add('notSelected');
        }
    })
}