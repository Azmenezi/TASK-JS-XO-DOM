function fillButton(index, text) {
  const btn = document.getElementById(index);
  btn.innerHTML = `<span class="button-text">${text}</span>`;
  const textElement = btn.querySelector(".button-text");
  textElement.classList.add("animate");

  setTimeout(() => {
    textElement.classList.remove("animate");
  }, 500);
}

const addClass = (id, Class) =>
  document.getElementById(id).classList.add(Class);

const removeClass = (id, Class) =>
  document.getElementById(id).classList.remove(Class);

const addText = (id, text) => (document.getElementById(id).innerHTML = text);

const evenOdd = (index) => index % 2 == 0;

const xPlayer = (index) => {
  if (index !== undefined) {
    fillButton(index, "X");
    clicked_X.push(index);
  }
  addClass(index, "green");
  addText("turn", "O to play");
};
const oPlayer = (index) => {
  if (index !== undefined) {
    fillButton(index, "O");
    clicked_O.push(index);
  }
  addClass(index, "red");
  addText("turn", "X to play");
};

const oWins = () => {
  scoreO++;
  addText("turn", "O Won the game!!");
  addText("scoreO", `O score: ${scoreO}`);
  restartGame();
};

const xWins = () => {
  scoreX++;
  addText("turn", "X Won the game!!");
  addText("scoreX", `X score: ${scoreX}`);
  restartGame();
};
const xSpot = (index) => clicked_X.includes(index);
const oSpot = (index) => clicked_O.includes(index);
let count = 0;
let clicked_O = [];
let clicked_X = [];
let scoreX = 0;
let scoreO = 0;

function clickButton(index) {
  if (count == 0) {
    for (let i = 1; i < 10; i++) {
      fillButton(i, "");
      removeClass(i, "green");
      removeClass(i, "red");
      removeClass(i, "black");
      removeClass(i, "winner");
    }
  }

  if (!clicked_X.includes(index) && !clicked_O.includes(index)) {
    count++;

    xPlayer(index);
    if (checkWinner() == null) {
      bestMove();
    }
    if (checkWinner() == "O") {
      oWins();
    } else if (checkWinner() == "X") {
      xWins();
    } else if (checkWinner() == "tie") {
      addText("turn", "Its A Tie!");
      restartGame();
    }

    console.log(clicked_O, clicked_X);
  }
}
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

const restartGame = () => {
  clicked_X = [];
  clicked_O = [];
  count = 0;
};

const resetGame = () => {
  scoreO = 0;
  scoreX = 0;
  addText("scoreO", `O score: ${scoreO}`);
  addText("scoreX", `X score: ${scoreX}`);
  addText("turn", "Game has been reset");
  restartGame();
};
//////////////////////////////////////////////////////////////

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i].every((move) => clicked_O.includes(move))) {
      return "O";
    } else if (winConditions[i].every((move) => clicked_X.includes(move))) {
      return "X";
    }
  }
  if (clicked_O.length + clicked_X.length == 9) {
    return "tie";
  }
  return null;
}

const scores = {
  X: -1,
  O: 1,
  tie: 0,
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function cornered() {
  let corners = [1, 3, 7, 9];
  for (let i = 0; i < clicked_X.length; i++) {
    if (clicked_X.includes(5) && corners.includes(clicked_X[i])) {
      return true;
    }
  }
  return false;
}

function bestMove() {
  // Check if AI can win in the next move
  for (let i = 1; i <= 9; i++) {
    if (!clicked_X.includes(i) && !clicked_O.includes(i)) {
      clicked_O.push(i);
      if (checkWinner() == "O") {
        oPlayer(i);
        return;
      } else {
        clicked_O.pop();
      }
    }
  }

  // Check if the player can win in the next move, and block them
  for (let i = 1; i <= 9; i++) {
    if (!clicked_X.includes(i) && !clicked_O.includes(i)) {
      clicked_X.push(i);
      if (checkWinner() == "X") {
        clicked_X.pop();
        oPlayer(i);
        return;
      } else {
        clicked_X.pop();
      }
    }
  }
  // Try to take the center
  if (!clicked_X.includes(5) && !clicked_O.includes(5)) {
    oPlayer(5);
    return;
  }

  let bCorners = [2, 4, 6, 8];
  let corners = [1, 3, 7, 9];
  // Try to take a corner
  for (let i = 0; i < corners.length; i++) {
    if (
      cornered() == true &&
      !clicked_X.includes(corners[i]) &&
      !clicked_O.includes(corners[i])
    ) {
      oPlayer(corners[i]);
      return;
    }
  }

  // Try to take a beside a corner If X has two corners
  if (clicked_O.includes(5)) {
    let xCorners = clicked_X.filter((i) => corners.includes(i));
    if (xCorners.length === 2) {
      for (let i = 0; i < bCorners.length; i++) {
        if (
          !clicked_X.includes(bCorners[i]) &&
          !clicked_O.includes(bCorners[i])
        ) {
          oPlayer(bCorners[i]);
          return;
        }
      }
    }
  }

  shuffle(corners);
  // Try to take a corner
  for (let i = 0; i < corners.length; i++) {
    if (!clicked_X.includes(corners[i]) && !clicked_O.includes(corners[i])) {
      oPlayer(corners[i]);
      return;
    }
  }

  let moves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffle(moves);
  // Take any other spot
  for (let i = 1; i <= 9; i++) {
    if (!xSpot(moves[i]) && !oSpot(moves[i])) {
      oPlayer(moves[i]);
      return;
    }
  }
}
