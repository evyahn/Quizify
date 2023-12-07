
// back to home button -> index.html
const backToHome2 = document.querySelector(".page-button");
backToHome2.addEventListener("click", () => {
    window.location.href = "index.html";
})

// get results button -> display result box
const getResultsButton = document.querySelector(".get-results-button")
const resultsBox = document.querySelector(".result-container")
getResultsButton.addEventListener("click", () => {
    getResultsButton.classList.add("hide")
    resultsBox.classList.remove("hide");
})
