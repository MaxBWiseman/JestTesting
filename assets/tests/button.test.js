/**
 * @jest-environment jsdom
 */

//Must use jsdom environment to test DOM as shown above

const buttonClick = require("/workspace/JestTesting/assets/tests/button.js");

beforeAll(() => {
    document.body.innerHTML = "<p id='par'></p>";
});

describe("DOM tests", () => {
    test("Expects content to change", () => {
        buttonClick();
        expect(document.getElementById("par")
            .innerHTML).toEqual("You Clicked");
    });
});