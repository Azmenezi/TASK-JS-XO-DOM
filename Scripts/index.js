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
  fillButton(index, "X");
  addClass(index, "green");
  addText("turn", "O to play");
  clicked_X.push(index);
};
const oPlayer = (index) => {
  fillButton(index, "O");
  addClass(index, "red");
  addText("turn", "X to play");
  clicked_O.push(index);
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
    if (evenOdd(count)) {
      oPlayer(index);
      if (checkWinner(clicked_O)) {
        oWins();
      }
    } else {
      xPlayer(index);
      if (checkWinner(clicked_X)) {
        xWins();
      }
    }
    if (clicked_X.length == 5 && !checkWinner(clicked_X)) {
      addText("turn", "Its A Tie!");
      restartGame();
    }
  }

  console.log(clicked_O, clicked_X);
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

const checkWinner = (playerMoves) => {
  for (let i = 0; i < winConditions.length; i++) {
    if (winConditions[i].every((move) => playerMoves.includes(move))) {
      console.log(true);
      winConditions[i].forEach((index) => addClass(index, "winner"));
      return true;
    }
  }
  return false;
};

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
