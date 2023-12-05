
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

console.log("hello")
const backToHome = document.querySelector(".page-button-container");
console.log(backToHome)
backToHome.addEventListener("click", () => {
    console.log("clicked home")
    window.location.href = "index.html";
})