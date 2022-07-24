
let mode = +sessionStorage.getItem("mode");
sessionStorage.clear();

let upCont = document.querySelector(".up-game-container");
let gameCount = document.createElement("p");
let points = upCont.children[0];

gameCount.innerText = "Games played: 0";
points.children[0].innerText = "You: 0";
points.children[1].innerText = "Me: 0";

let back = document.querySelector(".back");
back.addEventListener("click", () => window.location.href = "./index.html"); 

switch (mode) {
    case 0:
        upCont.innerText = "We are playing a single game";
        break;

    case 1:
        upCont.innerText = "We are playing a best out of three";
        break;

    case 2:
        upCont.innerText = "We are playing a best out of five";
        break;
    
    case 3:
        upCont.innerText = "We are playing until one of us gets five points";
        break;
}

if (mode != 0) {
    upCont.appendChild(gameCount);
    upCont.appendChild(points);
}


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
    for (let i = 0; i < 5; ++i) {
        let cpu = getComputerChoice()

        let final = playRound(player, cpu)

        console.log(final)

        if (final[0] == `I`) continue;

        (final[4] == `W`) ? playerWins += 1 : cpuWins += 1
    }
}