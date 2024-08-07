const buttonClick = require('/workspace/JestTesting/assets/tests/button.js');

beforeEach(() => {
  document.body.innerHTML = '<p id="par"></p>';
  document.getElementById('button').addEventListener('click', buttonClick.buttonClick);
})