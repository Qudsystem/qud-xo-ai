// Game State
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'ai'; // 'ai' or 'player'
let scores = {
    X: 0,
    O: 0,
    draw: 0
};

// DOM Elements
const cells = document.querySelectorAll('.cell');
const currentPlayerText = document.getElementById('currentPlayerText');
const restartBtn = document.getElementById('restartBtn');
const modeBtn = document.getElementById('modeBtn');
const modeText = document.getElementById('modeText');
const modal = document.getElementById('winnerModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalIcon = document.getElementById('modalIcon');
const playAgainBtn = document.getElementById('playAgainBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

// Winning combinations
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

// Initialize game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    restartBtn.addEventListener('click', restartGame);
    modeBtn.addEventListener('click', toggleMode);
    playAgainBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        restartGame();
    });
    
    updateScoreDisplay();
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    makeMove(index, currentPlayer);
    
    if (!checkWinner() && gameActive && gameMode === 'ai' && currentPlayer === 'O') {
        // AI's turn
        setTimeout(() => {
            aiMove();
        }, 500);
    }
}

// Make a move
function makeMove(index, player) {
    board[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
    
    playSound(player);
}

// Check for winner
function checkWinner() {
    let roundWon = false;
    let winningCombination = null;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        gameActive = false;
        highlightWinner(winningCombination);
        announceWinner(currentPlayer);
        scores[currentPlayer]++;
        updateScoreDisplay();
        return true;
    }
    
    // Check for draw
    if (!board.includes('')) {
        gameActive = false;
        announceDraw();
        scores.draw++;
        updateScoreDisplay();
        return true;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerText();
    return false;
}

// Highlight winning cells
function highlightWinner(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winner');
    });
}

// Update current player text
function updateCurrentPlayerText() {
    const playerName = gameMode === 'ai' && currentPlayer === 'O' ? 'AI' : `Player ${currentPlayer}`;
    currentPlayerText.textContent = `${playerName}'s Turn`;
    currentPlayerText.style.color = currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4';
}

// Announce winner
function announceWinner(winner) {
    setTimeout(() => {
        const playerName = gameMode === 'ai' && winner === 'O' ? 'AI' : `Player ${winner}`;
        modalTitle.textContent = `${playerName} Wins!`;
        modalSubtitle.textContent = winner === 'X' ? 'Excellent Move!' : gameMode === 'ai' ? 'Better Luck Next Time!' : 'Great Job!';
        modalIcon.textContent = winner === 'X' ? '❌' : '⭕';
        modalIcon.style.color = winner === 'X' ? '#ff6b6b' : '#4ecdc4';
        modal.classList.add('show');
        playWinSound();
    }, 500);
}

// Announce draw
function announceDraw() {
    setTimeout(() => {
        modalTitle.textContent = "It's a Draw!";
        modalSubtitle.textContent = 'Well played by both!';
        modalIcon.textContent = '🤝';
        modalIcon.style.color = '#ffd700';
        modal.classList.add('show');
        playDrawSound();
    }, 500);
}

// Restart game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    
    updateCurrentPlayerText();
    modal.classList.remove('show');
}

// Toggle game mode
function toggleMode() {
    gameMode = gameMode === 'ai' ? 'player' : 'ai';
    modeText.textContent = gameMode === 'ai' ? 'vs AI' : 'vs Player';
    restartGame();
}

// Update score display
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// AI Logic
function aiMove() {
    if (!gameActive) return;
    
    const move = getBestMove();
    if (move !== -1) {
        makeMove(move, 'O');
        checkWinner();
    }
}

// Get best move for AI (Minimax algorithm)
function getBestMove() {
    // First, try to win
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (isWinningMove('O')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Block player from winning
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (isWinningMove('X')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Take center if available
    if (board[4] === '') {
        return 4;
    }
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available space
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    return -1;
}

// Check if a move is winning
function isWinningMove(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// Sound effects (using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(player) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = player === 'X' ? 440 : 554.37;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playWinSound() {
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }, index * 100);
    });
}

function playDrawSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Initialize the game when DOM is loaded
initGame();
