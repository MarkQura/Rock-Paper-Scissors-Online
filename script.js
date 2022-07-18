let getComputerChoice = () => Math.floor(Math.random() * 3) + 1;

let  winner = (player, cpu) => {
    if (cpu == 1 && player == 3) {
        return 0;
    } else if (cpu == 3 && player == 1) {
        return 1;
    } else if ( player > cpu) {
        return 1;
    } else if (cpu > player) {
        return 0;
    } else {
        return null;
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
