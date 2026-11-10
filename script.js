const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const toggleDarkMode = document.getElementById('toggleDarkMode');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

function handleCellClick(index) {
  if (gameActive && gameState[index] === "") {
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (checkWin()) {
      statusText.textContent = `${currentPlayer} wins! 🎉`
      gameActive = false;
      updateScore(currentPlayer);
    } else if (checkDraw()) {
      statusText.textContent = "Draw! 😐"
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

function checkDraw() {
  return !gameState.some(cell => cell === "");
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

toggleDarkMode.addEventListener('click', toggleDarkModeHandler);

function toggleDarkModeHandler() {
  document.body.classList.toggle('dark-mode');
}

const gameHistory = [];

function updateScore(player) {
  const scoreX = document.getElementById('scoreX');
  const scoreO = document.getElementById('scoreO');
  if (player === 'X') {
    scoreX.textContent = parseInt(scoreX.textContent) + 1;
  } else {
    scoreO.textContent = parseInt(scoreO.textContent) + 1;
  }
}

function checkWin() {
  const winner = winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });

  if (winner) {
    const winnerName = currentPlayer;
    const winningScore = currentPlayer === "X" ? scoreX.textContent : scoreO.textContent;
    gameHistory.push({ winner: winnerName, score: winningScore });
  }

  return winner;
}
