let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0
}
//the game object contains the score, currentGame, playerMoves, and choices keys. The choices key contains an array of the ids of the buttons in the game

const newGame = function () {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    game.turnNumber = 0;
    for (let circle of document.querySelectorAll(".circle")) { //get all elements with the class .circle
        if (circle.getAttribute("data-listener") !== "true") { //if the data-listener attribute is not true
            circle.addEventListener("click", (e) => { //add an event listener to the circle
                let move = e.target.getAttribute("id"); //get the id of the circle the user has clicked
                lightsOn(move) //call the lightsOn function to flash the circle the user has clicked
                game.playerMoves.push(move) //add the move to the playerMoves array
                playerTurnCompare()
            })
            circle.setAttribute("data-listener", "true") //set the data-listener attribute to true
        }
    }
    showScore() //call the showScore function to display the score on the screen
    addTurn() //call the addTurn function to add a computer turn to the game for user to memorize
}
//newGame function resets the score to 0, currentGame to an empty array, playerMoves to an empty array, adds a turn to the game for player to follow

const addTurn = () => {
    game.playerMoves = [];
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    showTurns()
}
//addTurn resets the playerMoves array and adds a random circle from choices array to the currentGame array for the player to follow

const showScore = () => document.getElementById("score").textContent = game.score;
//showScore function is a function that displays the score on the screen from the game object

const lightsOn = (circ) => {
    document.getElementById(circ).classList.add("light"); //adds the light class to the circle so it has a flashing effect
    setTimeout(() => { //setTimeout is a function that allows a delay in the execution of a function, here it is 400miliseconds
        document.getElementById(circ).classList.remove("light");
    }, 400); //setTimeout speed declared here
}
//LightOn flashes all the items in the currentGame array one after the other, it adds the light class to the circle and removes it after 400miliseconds


const showTurns = () => {
    game.turnNumber = 0;
    let turns = setInterval(() => { //setInterval allows a loop at a declared rate,here is every 800miliseconds it loops
        lightsOn(game.currentGame[game.turnNumber]); //goes through the current game array at the indices of the turnNumber
        game.turnNumber++; //increase turnNumber index to allow iteration through the array
        if (game.turnNumber >= game.currentGame.length) { //if turnNumber is equal or greater than currentGame array, stops the interval
            clearInterval(turns);
        }
    }, 800) //800miliseconds, this is where to declare the speed of loop for setInterval()
}

const playerTurnCompare = () => {//compares the computer moves to the player moves
    if (game.playerMoves[game.playerMoves.length - 1] !== game.currentGame[game.playerMoves.length - 1]) {
        alert("Wrong move!")//if the last item in the playerMoves array is not equal to the last item in the currentGame array
        newGame()//call the newGame function to reset the game
    } else {
        if (game.playerMoves.length === game.currentGame.length) {//if the playerMoves array length is equal to the currentGame array length
            game.score++//increment the score
            addTurn()//call the addTurn function to add a new turn to the game
        }
    }
    showScore()
}

module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurnCompare
};
//always declare the functions and variables you want to export at the end of the file to test with jest