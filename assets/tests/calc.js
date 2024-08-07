
function subtraction(a, b) {
    return a - b
}


function addition(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Error: Both arguments must be numbers')
    }
    return a + b
}


module.exports = {
    addition,
    subtraction
};