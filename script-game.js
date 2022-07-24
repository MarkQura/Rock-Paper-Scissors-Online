
const mode = +sessionStorage.getItem("mode");
let selected = -1;
let rounds = 0;
let playerWins = 0;
let cpuWins = 0;
const TIMEOUT = 1000;

const upCont = document.querySelector(".up-game-container");
const downText = document.querySelector(".result");
const gameCount = document.createElement("p");
const points = upCont.children[0];

const gameBtns = Array.from(document.querySelectorAll(".left .card"));
const runBtn = document.querySelector(".middle button");

const cpuCard = document.querySelector(".right .card");
const back = document.querySelector(".back");

updateText("");

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

function updateText(result) {
    gameCount.innerText = `Games played: ${rounds}`;
    points.children[0].innerText = `You: ${playerWins}`;
    points.children[1].innerText = `Me: ${cpuWins}`;
    downText.innerText = result;
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

let displayCpuChoice = cpu => {
    let image = document.createElement("img");
    let txt = document.createTextNode("Paper");
    cpuCard.fontSize = "25px";

    switch (cpu) {
        case 1:
            image.src = "images/rock.png";
            txt.textContent = "Rock";
            break;
        
        case 2:
            image.src = "images/paper.png";
            txt.textContent = "Paper";
            break;

        case 3:
            image.src = "images/scissors.png";
            txt.textContent = "Scissors";
            image.classList.add("scissors");
            break;

    } 

    cpuCard.appendChild(image);
    cpuCard.appendChild(txt);
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

let removeClutter = () => {
    upCont.removeChild(gameCount);
    upCont.removeChild(points);
    downText.innerText = "";
}

let displayResults = result => {

    let centerCont = document.querySelector(".center-game-container")
    let tempArr = Array.from(centerCont.children);

    tempArr.forEach(item => centerCont.removeChild(item));
    centerCont.appendChild(document.createTextNode(result));

    back.innerText = "Back"
    sessionStorage.clear();
}

let bestOf = number => {

    if (playerWins == cpuWins + number) {

        setTimeout(() => {

            removeClutter();
            displayResults(`You Win! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);

        }, TIMEOUT);

    } else if (cpuWins == playerWins + number){

        setTimeout(() => {
            
            removeClutter();
            displayResults(`You Lose! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);

        }, TIMEOUT);
    }
}

let updateData = result => {
    ++rounds;
    
    if (result[0] != `I`)
        (result[4] == `W`) ? playerWins += 1 : cpuWins += 1;
}

gameBtns[0].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected) {
            gameBtns[0].classList.add("selected");
            selected = 0;
            return;
        }
        selected = -1;
        return;
    }
    
    gameBtns[0].classList.toggle("selected");
    selected = 0;
});

gameBtns[1].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected != 1) {
            gameBtns[1].classList.add("selected");
            selected = 1;
            return;
        }
        selected = -1;
        return;
    }
    
    gameBtns[1].classList.toggle("selected");
    selected = 1;
});

gameBtns[2].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected != 2) {
            gameBtns[2].classList.add("selected");
            selected = 2;
            return;
        }
        selected = -1;
        return;
    }

    gameBtns[2].classList.add("selected");
    selected = 2;
});

runBtn.addEventListener("click", () => {
    if (selected == -1) return;
    
    let cpu = getComputerChoice();
    displayCpuChoice(cpu);
    
    let result = playRound(selected + 1, cpu);
    
    setTimeout(() => {
        cpuCard.innerHTML = "";
        gameBtns[selected].classList.remove("selected");
        selected = -1;
    }, TIMEOUT);

    switch (mode) {

        case 0: {
            setTimeout(() => {

                displayResults(result);

            }, TIMEOUT);
            break;
        }

        case 1: {
            updateData(result);
            updateText(result);

            bestOf(2);
            break;
        }

        case 2: {
            updateData(result);
            updateText(result);

            bestOf(3);
            break;
        }
        case 3: {
            updateData(result);
            updateText(result);

            if (playerWins == 5) {
                setTimeout(() => {

                    removeClutter();
                    displayResults(`You Win! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);
        
                }, TIMEOUT);
            } else if (cpuWins == 5) {
                setTimeout(() => {

                    removeClutter();
                    displayResults(`You Lose! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);
        
                }, TIMEOUT);
            }
            break;
        }
    }
});


back.addEventListener("click", () => window.location.href = "./index.html"); 