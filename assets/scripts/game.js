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
    addTurn()
}

const addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    // showTurns()
}



const showScore = () => document.getElementById("score").textContent = game.score;
    


module.exports = { game, newGame, showScore, addTurn };