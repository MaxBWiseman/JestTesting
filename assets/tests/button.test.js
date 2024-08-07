/**
 * @jest-environment jsdom
 */

//Must use jsdom environment to test DOM as shown above

const buttonClick = require("/workspace/JestTesting/assets/tests/button.js");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open()
    document.write(fileContents);
    document.close()
});
// The above code reads the contents of the index.html file and writes it to
//the document object before running the tests. This is so the tests can access the DOM elements freshly
//This is boilerplate code that is used to set up the DOM for testing

describe("DOM tests", () => {
    test("Expects content to change", () => {
        buttonClick();
        expect(document.getElementById("par")
            .innerHTML).toEqual("You Clicked");
    });
    test('h1 should exist', () => {
        expect(document.getElementsByTagName('h1').length).toBe(1);   
    })
});

// The above code tests the buttonClick function in button.js. It uses Jest's expect
// function to check if the innerHTML of the element with the id "par" changes to "You Clicked" after the
// buttonClick function is called. The beforeAll function is used to read the contents of the index.html 
// file, which contains the element with the id "par". The jsdom environment is used to simulate a browser
// environment for testing DOM manipulation.
