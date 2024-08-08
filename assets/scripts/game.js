let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

const newGame = function () {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore()
}

const showScore = function () {
    document.getElementById("score").textContent = game.score;
}

module.exports = { game, newGame };