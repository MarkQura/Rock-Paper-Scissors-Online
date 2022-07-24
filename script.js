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


let getComputerChoice = () => Math.floor(Math.random() * 3) + 1;

let  winner = (player, cpu) => {
    if (cpu == player) {
        return null
    } else if ((player > cpu || (cpu == 3 && player == 1)) && (cpu != 1 || player != 3)) {
        return 1;
    } else {
        return 0;
    }
}

let playRound = (player, cpu) => {
    let choices = [`Rock`, `Paper`, `Scissors`]
    let result = winner(player, cpu)
    if (result == null) {
        return "It's a draw"
    }
    return `You ${result ? `Win` : `Lose`}! ${choices[(result ? player : cpu) - 1]} beats ${choices[(result ? cpu : player) - 1]}`
}

let game = () => {
    let playerWins = 0;
    let cpuWins = 0;

    for (let i = 0; i < 5; ++i) {
        let cpu = getComputerChoice()

        let final = playRound(player, cpu)

        console.log(final)

        if (final[0] == `I`) continue;

        (final[4] == `W`) ? playerWins += 1 : cpuWins += 1
    }
}

yesButton.addEventListener("click", () => {
    upCont.innerText = "Good!";

    upCont.appendChild(para);

    downCont.style.padding = "10px 50px"

    for (let i = 2; i < 7; ++i)
        downCont.appendChild(buttons[i]);

    for (let i = 0; i < 2; ++i)
        downCont.removeChild(buttons[i]);
});

cancelBtn.addEventListener("click", () => {
    upCont.innerText = "Don't you want to play with me?";

    downCont.style.padding = "10px 100px"

    for (let i = 2; i < 7; ++i)
        downCont.removeChild(buttons[i]); 

    for (let i = 0; i < 2; ++i)
        downCont.appendChild(buttons[i]);
});

noButton.addEventListener("click", () => {

});