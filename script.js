let centerCont = document.querySelector(".center-container");
let upCont = document.querySelector(".center-container .up");
let downCont = document.querySelector(".center-container .down");
let yesButton = document.querySelector("button.yes");
let noButton = document.querySelector("button.no");

let para;
let oneBtn;
let bestOfThreeBtn;
let bestOfFiveBtn;


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

    para = document.createElement("div");
    oneBtn = document.createElement("button");
    bestOfThreeBtn = document.createElement("button");
    bestOfFiveBtn = document.createElement("button");

    para.innerText = "What type of match do you want to play?";
    oneBtn.innerText = "One game";
    bestOfThreeBtn.innerText = "Best of three";
    bestOfFiveBtn.innerText = "Best of five";

    upCont.appendChild(para);

    downCont.appendChild(oneBtn);
    downCont.appendChild(bestOfThreeBtn);
    downCont.appendChild(bestOfFiveBtn);

    downCont.removeChild(yesButton);
    downCont.removeChild(noButton);
});

noButton.addEventListener("click", () => console.log("oh no!"));