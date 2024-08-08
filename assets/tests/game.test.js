/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("/workspace/JestTesting/assets/scripts/game.js");

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

    });

