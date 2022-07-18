let getComputerChoice = () => Math.floor(Math.random() * 3) + 1;

let  winner = (player, cpu) => {
    if (cpu == player) {
        return null
    } else if (player > cpu || (cpu == 3 && player == 1)) {
        return 1;
    } else {
        return 0;
    }
}

let playerInput = () => {
    let input = prompt(`Input either Rock Paper or Scissors to play a game`)
    while (1) {
        input = input.toLowerCase()
        switch(input) {
            case "rock":
                return 1
                
            case "paper":
                return 2
                
            case "scissors":
                return 3
                    
            default:
                input = prompt(`Input not accepted please try again`)
                break
        }
        
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
        let player = playerInput()
        let cpu = getComputerChoice()

        let final = playRound(player, cpu)

        console.log(final)

        if (final[0] == `I`) continue;

        (final[4] == `W`) ? playerWins += 1 : cpuWins += 1
    }
}

game()