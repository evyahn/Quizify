// energy, genre, popularity, speechiness
const tasteQuizArray = [];
const tasteMeaning = [
    false,
    [0.2, 0.85, 1, 0.6, 0.35, 0],
    ['pop', 'country', 'r&b', 'latinpop', 'punk', 'indie'],
    [100, 30, 10, 80, 60, 0],
    [0.15, 0.3, 0.6, 0.9, 0.5, 0.1]
]

// energy, genre, popularity
const moodQuizArray = [];
const moodMeaning = [
    [0.8, 0.25, 0, 0.4, 1, 0.6],
    ['pop', 'edm', 'folk', 'beachpop', 'lofi', 'rock'],
    false
]

// energy, tempo, popularity, speechiness, genre, valence
const cityQuizArray = [];
const cityMeaning = [
    [6, 7, 8, 3, 2, 10],
    [90, 109, 140, 75, 160, 120],
    [30, 100, 50, 35, 80, 0],
    [0.9, 1, 0.2, 0.5, 0.35, 0.7],
    ['emo', 'r&b', 'folk', 'indie', 'country', 'surfrock'],
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