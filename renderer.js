document.addEventListener("DOMContentLoaded", () => {

  // ================== CONSTANTS ==================
  const ROWS = 6;
  const COLS = 7;

  // ================== SOUNDS ==================
  const sounds = {
    drop: new Audio("assets/sounds/drop.wav"),
    win: new Audio("assets/sounds/win.wav"),
    draw: new Audio("assets/sounds/draw.wav"),
    click: new Audio("assets/sounds/click.wav")
  };

  function playSound(sound) {
    if (!sounds[sound]) return;
    sounds[sound].currentTime = 0;
    sounds[sound].play();
  }

  // ================== GAME STATE ==================
  let board = [];
  let currentPlayer = "R";
  let gameMode = null;
  let gameOver = false;
  let winningCells = [];
  let lastMove = null;
  let difficulty = "medium"; // easy | medium | hard


  // ================== DOM ELEMENTS ==================
  const boardDiv = document.getElementById("board");
  const modeSelect = document.getElementById("mode-select");
  const gameDiv = document.getElementById("game");

  const btnHuman = document.getElementById("btn-human");
  const btnAI = document.getElementById("btn-ai");

  const winModal = document.getElementById("win-modal");
  const winMessage = document.getElementById("win-message");
  const modalRestart = document.getElementById("modal-restart");
  const modalChangeMode = document.getElementById("modal-change-mode");
  const difficultySelect = document.getElementById("difficulty-select");


  // ================== INITIAL UI ==================
  modeSelect.style.display = "block";
  gameDiv.style.display = "none";

  // ================== EVENT LISTENERS ==================
  btnHuman.addEventListener("click", () => {
    playSound("click");
    startGame("HUMAN");
  });

  btnAI.addEventListener("click", () => {
    playSound("click");
    startGame("AI");
  });

  modalRestart.addEventListener("click", () => {
    playSound("click");
    winModal.classList.add("hidden");
    resetGame();
  });

  modalChangeMode.addEventListener("click", () => {
    playSound("click");
    winModal.classList.add("hidden");
    changeMode();
  });
  difficultySelect.addEventListener("change", () => {
  difficulty = difficultySelect.value;
});


  // ================== GAME FLOW ==================
  function startGame(mode) {
    gameMode = mode;
    modeSelect.style.display = "none";
    gameDiv.style.display = "block";
    resetGame();
  }

  function changeMode() {
    gameMode = null;
    gameOver = false;
    winningCells = [];
    lastMove = null;
    modeSelect.style.display = "block";
    gameDiv.style.display = "none";
  }

  function resetGame() {
    board = Array.from({ length: ROWS }, () =>
      Array(COLS).fill(null)
    );
    currentPlayer = "R";
    gameOver = false;
    winningCells = [];
    lastMove = null;
    renderBoard();
  }

  // ================== RENDER ==================
  function renderBoard() {
    boardDiv.innerHTML = "";

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (board[r][c]) {
          const disc = document.createElement("div");
          disc.classList.add("disc");

          if (board[r][c] === "R") disc.classList.add("red");
          if (board[r][c] === "Y") disc.classList.add("yellow");

          // Drop animation only for last move
          if (lastMove && lastMove.row === r && lastMove.col === c) {
            setTimeout(() => disc.classList.add("drop"), 10);
          } else {
            disc.style.top = "0";
          }

          // Winning glow on CELL
          if (winningCells.some(([wr, wc]) => wr === r && wc === c)) {
            cell.classList.add("win");
          }

          cell.appendChild(disc);
        }

        cell.addEventListener("click", () => handleMove(c));
        boardDiv.appendChild(cell);
      }
    }
  }

  // ================== HUMAN MOVE ==================
  function handleMove(col) {
    if (gameOver) return;
    if (gameMode === "AI" && currentPlayer === "Y") return;

    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === null) {

        board[r][col] = currentPlayer;
        lastMove = { row: r, col };
        playSound("drop");

        // WIN CHECK
        if (checkWin(r, col, currentPlayer)) {
          gameOver = true;
          renderBoard();
          playSound("win");

          setTimeout(() => {
            showWinModal(
              gameMode === "AI"
                ? (currentPlayer === "R" ? "Human Wins!" : "AI Wins!")
                : (currentPlayer === "R" ? "Human A Wins!" : "Human B Wins!")
            );
          }, 1000);

          return;
        }

        // DRAW CHECK
        if (isBoardFull()) {
          gameOver = true;
          renderBoard();
          playSound("draw");

          setTimeout(() => {
            showWinModal("🤝 It's a Draw!");
          }, 1000);

          return;
        }

        renderBoard();

        if (gameMode === "AI" && currentPlayer === "R") {
          currentPlayer = "Y";
          setTimeout(computerMove, 400);
        } else {
          currentPlayer = currentPlayer === "R" ? "Y" : "R";
        }

        break;
      }
    }
  }
  function placeAIDisc(row, col) {
  if (row === null || col === null) return;

  board[row][col] = "Y";
  lastMove = { row, col };
  playSound("drop");

  // WIN CHECK
  if (checkWin(row, col, "Y")) {
    gameOver = true;
    renderBoard();
    playSound("win");

    setTimeout(() => {
      showWinModal("AI Wins!");
    }, 1000);

    return;
  }

  // DRAW CHECK
  if (isBoardFull()) {
    gameOver = true;
    renderBoard();
    playSound("draw");

    setTimeout(() => {
      showWinModal("🤝 It's a Draw!");
    }, 1000);

    return;
  }

  renderBoard();
  currentPlayer = "R";
}


  // ================== AI MOVE ==================
  function computerMove() {
  if (gameOver) return;
  if (difficulty === "expert") {
  const col = getBestMoveMinimax(4); // depth = 4 (safe)
  const row = getAvailableRow(col);
  placeAIDisc(row, col);
  return;
}


  if (difficulty === "easy") {
    playRandomMove();
    return;
  }

  if (difficulty === "hard") {
    // Try center first
    const center = Math.floor(COLS / 2);
    const r = getAvailableRow(center);
    if (r !== null) {
      placeAIDisc(r, center);
      return;
    }
  }

  // Medium & Hard → try win
  for (let c = 0; c < COLS; c++) {
    const r = getAvailableRow(c);
    if (r !== null && wouldWin(r, c, "Y")) {
      placeAIDisc(r, c);
      return;
    }
  }

  // Medium & Hard → block human
  for (let c = 0; c < COLS; c++) {
    const r = getAvailableRow(c);
    if (r !== null && wouldWin(r, c, "R")) {
      placeAIDisc(r, c);
      return;
    }
  }

  playRandomMove();
}


  // ================== WIN DETECTION ==================
  function checkWin(row, col, player) {
    winningCells = [];

    return (
      findWinningCells(row, col, player, 0, 1) ||
      findWinningCells(row, col, player, 1, 0) ||
      findWinningCells(row, col, player, 1, 1) ||
      findWinningCells(row, col, player, 1, -1)
    );
  }

  function findWinningCells(row, col, player, dr, dc) {
    let cells = [[row, col]];

    for (let i = 1; i < 4; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;
      if (board[r][c] === player) cells.push([r, c]);
      else break;
    }

    for (let i = 1; i < 4; i++) {
      const r = row - dr * i;
      const c = col - dc * i;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS) break;
      if (board[r][c] === player) cells.push([r, c]);
      else break;
    }

    if (cells.length >= 4) {
      winningCells = cells.slice(0, 4);
      return true;
    }

    return false;
  }

  // ================== HELPERS ==================
  function isBoardFull() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c] === null) return false;
      }
    }
    return true;
  }

  function getAvailableRow(col) {
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === null) return r;
    }
    return null;
  }

  function wouldWin(row, col, player) {
    board[row][col] = player;
    const win = checkWin(row, col, player);
    board[row][col] = null;
    winningCells = [];
    return win;
  }
  function playRandomMove() {
  let validCols = [];
  for (let c = 0; c < COLS; c++) {
    if (board[0][c] === null) validCols.push(c);
  }

  const col = validCols[Math.floor(Math.random() * validCols.length)];
  const row = getAvailableRow(col);
  placeAIDisc(row, col);
}
function getBestMoveMinimax(depth) {
  let bestScore = -Infinity;
  let bestCol = null;

  for (let c = 0; c < COLS; c++) {
    const r = getAvailableRow(c);
    if (r === null) continue;

    board[r][c] = "Y";
    const score = minimax(depth - 1, false, -Infinity, Infinity);
    board[r][c] = null;

    if (score > bestScore) {
      bestScore = score;
      bestCol = c;
    }
  }

  return bestCol;
}
function minimax(depth, isMaximizing, alpha, beta) {

  if (depth === 0) return evaluateBoard();

  if (isMaximizing) {
    let maxEval = -Infinity;

    for (let c = 0; c < COLS; c++) {
      const r = getAvailableRow(c);
      if (r === null) continue;

      board[r][c] = "Y";
      if (checkWin(r, c, "Y")) {
        board[r][c] = null;
        return 100000;
      }

      const evalScore = minimax(depth - 1, false, alpha, beta);
      board[r][c] = null;

      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }

    return maxEval;
  } else {
    let minEval = Infinity;

    for (let c = 0; c < COLS; c++) {
      const r = getAvailableRow(c);
      if (r === null) continue;

      board[r][c] = "R";
      if (checkWin(r, c, "R")) {
        board[r][c] = null;
        return -100000;
      }

      const evalScore = minimax(depth - 1, true, alpha, beta);
      board[r][c] = null;

      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }

    return minEval;
  }
}
function evaluateBoard() {
  let score = 0;

  score += countPatterns("Y", 3) * 100;
  score += countPatterns("Y", 2) * 10;
  score -= countPatterns("R", 3) * 120;
  score -= countPatterns("R", 2) * 10;

  return score;
}
function countPatterns(player, length) {
  let count = 0;

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1]
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      for (let [dr, dc] of directions) {
        let matched = 0;

        for (let i = 0; i < length; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          if (
            nr >= 0 &&
            nr < ROWS &&
            nc >= 0 &&
            nc < COLS &&
            board[nr][nc] === player
          ) {
            matched++;
          }
        }

        if (matched === length) count++;
      }
    }
  }

  return count;
}



  // ================== WIN MODAL ==================
  function showWinModal(message) {
    winMessage.textContent = message;
    winModal.classList.remove("hidden");
  }

});
