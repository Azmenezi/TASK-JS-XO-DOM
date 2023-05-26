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

let count = 0;
let clicked_O = [];
let clicked_X = [];
const evenOdd = (index) => index % 2 == 0;
let scoreX = 0;
let scoreO = 0;
//check if for the winner--
function clickButton(index) {
  console.log(`Button number ${index} is clicked`);
  // Your main code here.

  if (!clicked_X.includes(index) && !clicked_O.includes(index)) {
    count++;
    if (evenOdd(count)) {
      fillButton(index, "O");
      document.getElementById(index).classList.add("red");
      document.getElementById("turn").innerHTML = "X to play";
      clicked_O.push(index);
      if (checkWinner(clicked_O)) {
        scoreO++;
        document.getElementById("turn").innerHTML = "O Won the game!!";
        document.getElementById("scoreO").innerHTML = `O score: ${scoreO}`;
        restartGame();
      }
    } else {
      fillButton(index, "X");
      document.getElementById(index).classList.add("green");
      document.getElementById("turn").innerHTML = "O to play";
      clicked_X.push(index);
      if (checkWinner(clicked_X)) {
        scoreX++;
        document.getElementById("turn").innerHTML = "X Won the game!!";
        document.getElementById("scoreX").innerHTML = `X score: ${scoreX}`;
        restartGame();
      } else if (clicked_X.length == 5 && !checkWinner(clicked_X)) {
        document.getElementById("turn").innerHTML = "Its A Tie!";
        restartGame();
      }
    }
  }
  console.log(clicked_O, clicked_X);
}

// ...

// const clicked = (index) => {

// };

/**
 * (Optional) It's always a good idea to make a function for every single purpose.
 */
const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const checkWinner = (playerMoves) => {
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i].every((move) => playerMoves.includes(move))) {
      console.log(true);
      return true;
    }
  }
  console.log(false);
  return false;
};

const restartGame = () => {
  for (let i = 1; i < 10; i++) {
    fillButton(i, "");
    document.getElementById(i).classList.remove("green");
    document.getElementById(i).classList.remove("red");
  }
  clicked_X = [];
  clicked_O = [];
  count = 0;
};

const resetGame = () => {
  scoreO = 0;
  scoreX = 0;
  document.getElementById("scoreO").innerHTML = `O score: ${scoreO}`;
  document.getElementById("scoreX").innerHTML = `X score: ${scoreX}`;
  document.getElementById("turn").innerHTML = "Game has been reset";
  restartGame();
};
