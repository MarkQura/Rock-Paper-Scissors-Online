let centerCont = document.querySelector(".center-container");
let upCont = document.querySelector(".center-container .up");
let downCont = document.querySelector(".center-container .down");
let yesButton = document.querySelector("button.yes");
let noButton = document.querySelector("button.no");

let para = document.createElement("div");
let oneBtn = document.createElement("button");
let bestOfThreeBtn = document.createElement("button");
let bestOfFiveBtn = document.createElement("button");
let upToFiveBtn = document.createElement("button");
let cancelBtn = document.createElement("button");

para.innerText = "What type of match do you want to play?";
oneBtn.innerText = "One game";
bestOfThreeBtn.innerText = "Best of 3";
bestOfFiveBtn.innerText = "Best of 5";
upToFiveBtn.innerText = "Until 5";
cancelBtn.innerText = "cancel";

let buttons = [yesButton, noButton, oneBtn, bestOfThreeBtn, bestOfFiveBtn, upToFiveBtn, cancelBtn]

let mode;

yesButton.addEventListener("click", () => {
    upCont.innerText = "Good!";

    upCont.appendChild(para);

    downCont.style.padding = "10px 50px"

    for (let i = 2; i < 7; ++i)
        downCont.appendChild(buttons[i]);

    for (let i = 0; i < 2; ++i)
        downCont.removeChild(buttons[i]);
});

oneBtn.addEventListener("click", () => {
    sessionStorage.setItem("mode", 0);
    window.location.href = "/game.html";
});

bestOfThreeBtn.addEventListener("click", () => {
    sessionStorage.setItem("mode", 1);
    window.location.href = "/game.html";
});

bestOfFiveBtn.addEventListener("click", () => {
    sessionStorage.setItem("mode", 2);
    window.location.href = "/game.html";
});

upToFiveBtn.addEventListener("click", () => {
    sessionStorage.setItem("mode", 3);
    window.location.href = "/game.html";
});

cancelBtn.addEventListener("click", () => {
    upCont.innerText = "Don't you want to play with me?";

    downCont.style.padding = "10px 100px";
    yesButton.innerText = "I do!";
    noButton.innerText = "I don't";

    for (let i = 2; i < 7; ++i)
        downCont.removeChild(buttons[i]); 

    for (let i = 0; i < 2; ++i)
        downCont.appendChild(buttons[i]);
});

noButton.addEventListener("click", () => {

});