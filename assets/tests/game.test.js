/**
 * @jest-environment jsdom
 */

const {
    default: JSDOMEnvironment
} = require("jest-environment-jsdom");

const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurnCompare
} = require("/workspace/JestTesting/assets/scripts/game.js");

jest.spyOn(window, "alert").mockImplementation(() => {});
//this is a mock function that replaces the window.alert function, it allows us to test if the alert function is called in the code
//.mockImplementation(() => { }) replaces the original alert method with an empty function. This means that when window.
//alert is called during the test, it won't actually display an alert dialog; instead, it will just execute the empty function.
//Prevent actual alerts: This is useful in tests to prevent actual alert dialogs from appearing, which can be disruptive.
//Track calls: It allows you to track how many times alert was called, with what arguments, etc., without triggering the actual behavior.
//the very most bottom test deals with this code


beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open()
    document.write(fileContents);
    document.close()
});

describe("game object contains correct keys", () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true)
    })
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true)

    })
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true)

    })
    test('choices key exists', () => {
        expect('choices' in game).toBe(true)

    })
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"])
    })
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true)
    })

})

describe("newGame function works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = [1, 2, 3, 4];
        game.playerMoves = [1, 2, 3, 4];
        document.getElementById("score").textContent = game.score;
        newGame()
    })
    test('score is reset to 0', () => {
        expect(game.score).toBe(0)
    })
    test('currentGame is an array with one item', () => {
        expect(game.currentGame.length).toBe(1)
    })
    test('playerMoves is an empty array', () => {
        expect(game.playerMoves).toEqual([])
    })
    test('score text content is 0', () => {
        expect(document.getElementById("score").textContent).toBe("0")
    })
    test('is data-listener attribute true on all circles', () => {
        let circles = document.querySelectorAll(".circle")
        for (let circle of circles) {
            expect(circle.getAttribute("data-listener")).toBe("true")
        }
    })
})


describe('gameplay functions work correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn()
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn()
        expect(game.currentGame.length).toBe(2)
    });
    test('should add correct class to button', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurnCompare();
        expect(game.score).toBe(1);

    });
    test('should call newGame if the turn is incorrect', () => {
        game.playerMoves.push("wrong");
        playerTurnCompare();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test('when showTurns is called, check if turnInProgress is true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test('clicking during the computers sequence should not work', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toBe('');
    });

});
