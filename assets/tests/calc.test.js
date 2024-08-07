const {addition, subtraction} = require('/workspace/JestTesting/assets/tests/calc.js')


describe('subtraction', () => {
    test('subtract 5 - 2 to equal 3', () => {
        expect(subtraction(5, 2)).toBe(3);
    });
    test('subtract 9 - 4 to equal 5', () => {
        expect(subtraction(9, 4)).toBe(5);
    });
});

describe('addition', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(addition(1, 2)).toBe(3);
    });
    test('adds 5 + 9 to equal 14', () => {
        expect(addition(5, 9)).toBe(14);
    });
    test('throws an error if a string is passed', () => {
        expect(() => addition('a', 2)).toThrow('Error: Both arguments must be numbers');
    });
}); 