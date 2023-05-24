// ❗️ DON'T TOUCH THESE 2 FUNCTIONs
// Pre-made function that will fill the button with its number.
// First button top left is called 1, last button bottom right is 9
function fillButton(index, text) {
  // This function fills the button of the send index
  document.getElementById(index).innerHTML = text;
}
// pre-made a function. You can use this function to present an alert to say someone wins
function winningAlert(winner) {
  if (confirm(`Horraaay, ${winner} wins!`)) {
    // The code here will be exectued if you press on OK button that will pop on the window
  }
}

// SAMPLE CODE: This code fills the 1st and 9th button with X and O initially
// ❗️ Delete this code once you are done testing

/**
 *
 * THE MAIN FUNCTION
 * This function gets executed every time the user clicks the button
 * Add your code here, since this is going to be your main function
 * That interacts with the UI
 */
const row1 = [1, 2, 3];
const row2 = [4, 5, 6];
const row3 = [7, 8, 9];
const col1 = [1, 4, 7];
const col2 = [2, 5, 8];
const col3 = [3, 6, 9];
const cross1 = [1, 5, 9];
const cross2 = [3, 5, 7];
const winConditions = [row1, row2, row3, col1, col2, col3, cross1, cross2];

let count = 0;
const clickedNumbers = [];
const clicked_O = [];
const clicked_X = [];
const evenOdd = (index) => index % 2 == 0;
// let checker = (arr, target) => target.every((v) => arr.includes(v));

const isWinX = winConditions.some((arr) => {
  // return if this combination is matching or not
  return arr.every((o) => {
    // return if the value matches or not
    return clicked_X.includes(o);
  });
});

const isWinO = winConditions.some((arr) => {
  // return if this combination is matching or not
  return arr.every((x) => {
    // return if the value matches or not
    return clicked_O.includes(x);
  });
});
//check if for the winner--
function clickButton(index) {
  console.log(`Button number ${index} is clicked`);
  // Your main code here.
  // console.log(count);
  // console.log(clickedNumbers.includes(index));
  // console.log(clickedNumbers);
  // console.log(clicked_O);
  if (!clickedNumbers.includes(index)) {
    clickedNumbers.push(index);
    count++;
    if (evenOdd(count)) {
      fillButton(index, "O");
      clicked_O.push(index);
    } else {
      fillButton(index, "X");
      clicked_X.push(index);
    }
  }
  if (count > 3) {
    if (isWinO) {
      winningAlert("O");
    } else if (isWinX) {
      winningAlert("X");
    }
  }
}

// ...

// const clicked = (index) => {

// };

/**
 * (Optional) It's always a good idea to make a function for every single purpose.
 */
// function checkWinner
// function restartGame
