function createPlayer(figure, color, name) {
  return {
    name,
    figure,
    color,
    score: 0,
    addScore() {
      return ++this.score;
    },
  };
}

const dave = createPlayer("x", "green", "Dave");
const john = createPlayer("o", "red", "John");

const game = ((player1, player2) => {
  // player 1 is true, player 2 is false
  const finishButton = document.querySelector(`#finish-button`);
  const playerOneSymbol = player1.figure;
  const playerTwoSymbol = player2.figure;
  let gameBoard = new Array(9);
  const container = document.querySelector("#gameboard");
  let counter = 0;
  const gameInfo = document.querySelector(`#game-info`);
  const resetButton = document.querySelector(`#reset-button`);
  let resetActivated = false;
  const player1score = document.querySelector(`#player-two-section > .score`);
  const player2score = document.querySelector(`#player-one-section > .score`);

  const addUnit = (id, bool) => {
    gameBoard[id] = bool;
    counter++;
  };

  const displayUnit = (cell, bool) => {
    bool
      ? (cell.textContent = playerOneSymbol)
      : (cell.textContent = playerTwoSymbol);
  };

  const evaluateDiagonally = () => {
    if (
      [gameBoard.at(0), gameBoard.at(4), gameBoard.at(8)].every(
        (el) => el === true
      ) ||
      [gameBoard.at(2), gameBoard.at(4), gameBoard.at(6)].every(
        (el) => el === true
      )
    ) {
      return true;
    } else if (
      [gameBoard.at(0), gameBoard.at(4), gameBoard.at(8)].every(
        (el) => el === false
      ) ||
      [gameBoard.at(2), gameBoard.at(4), gameBoard.at(6)].every(
        (el) => el === false
      )
    ) {
      return false;
    } else {
      return undefined;
    }
  };
  const evaluateHorizontally = () => {
    if (
      [gameBoard.at(0), gameBoard.at(1), gameBoard.at(2)].every(
        (el) => el === true
      ) ||
      [gameBoard.at(3), gameBoard.at(4), gameBoard.at(5)].every(
        (el) => el === true
      ) ||
      [gameBoard.at(6), gameBoard.at(7), gameBoard.at(8)].every(
        (el) => el === true
      )
    ) {
      return true;
    } else if (
      [gameBoard.at(0), gameBoard.at(1), gameBoard.at(2)].every(
        (el) => el === false
      ) ||
      [gameBoard.at(3), gameBoard.at(4), gameBoard.at(5)].every(
        (el) => el === false
      ) ||
      [gameBoard.at(6), gameBoard.at(7), gameBoard.at(8)].every(
        (el) => el === false
      )
    ) {
      return false;
    } else {
      return undefined;
    }
  };
  const evaluateVertically = () => {
    if (
      [gameBoard.at(0), gameBoard.at(3), gameBoard.at(6)].every(
        (el) => el === true
      ) ||
      [gameBoard.at(1), gameBoard.at(4), gameBoard.at(7)].every(
        (el) => el === true
      ) ||
      [gameBoard.at(2), gameBoard.at(5), gameBoard.at(8)].every(
        (el) => el === true
      )
    ) {
      return true;
    } else if (
      [gameBoard.at(0), gameBoard.at(3), gameBoard.at(6)].every(
        (el) => el === false
      ) ||
      [gameBoard.at(1), gameBoard.at(4), gameBoard.at(7)].every(
        (el) => el === false
      ) ||
      [gameBoard.at(2), gameBoard.at(5), gameBoard.at(8)].every(
        (el) => el === false
      )
    ) {
      return false;
    } else {
      return undefined;
    }
  };
  const evaluateBoard = () => {
    if (evaluateDiagonally() !== undefined) {
      return evaluateDiagonally();
    } else if (evaluateHorizontally() !== undefined) {
      return evaluateHorizontally();
    } else if (evaluateVertically() !== undefined) {
      return evaluateVertically();
    } else if (!gameBoard.includes(undefined)) {
      return "tie";
    }
  };

  const evaluateCounter = () => {
    return counter % 2 === 0;
  };

  resetButton.addEventListener("click", () => {
    resetButton.classList.toggle("hidden");
    resetBoard();
    resetActivated = false;
  });

  const attachCellEvent = (id, cell) => {
    cell.addEventListener("click", () => {
      if (!resetActivated) {
        const result = evaluateCounter();
        if (gameBoard.at(id) === undefined) {
          addUnit(id, result);
          displayUnit(cell, result);
          if (evaluateBoard() === "tie") {
            gameInfo.textContent = `its a tie`;
            resetButton.classList.toggle("hidden");
            resetActivated = true;
          } else if (evaluateBoard() === true) {
            gameInfo.textContent = `${player1.name} is winner`;
            player1.addScore();
            player1score.textContent = player1.score;
            resetButton.classList.toggle("hidden");
            resetActivated = true;
          } else if (evaluateBoard() === false) {
            gameInfo.textContent = `${player2.name} is winner`;
            player2.addScore();
            player2score.textContent = player2.score;
            resetButton.classList.toggle("hidden");
            resetActivated = true;
          }
        }
      }
    });
  };

  const createCells = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      const cell = document.createElement("button");
      cell.setAttribute("id", `cell-${i}`);
      container.appendChild(cell);
      attachCellEvent(i, cell);
    }
  };

  createCells();

  const destroyCells = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      const cell = document.querySelector(`#cell-${i}`);
      container.removeChild(cell);
    }
  };

  const resetBoard = () => {
    gameBoard.fill(undefined);
    destroyCells();
    createCells();
    gameInfo.textContent = "";
  };

  return {
    getGameBoard() {
      console.table(gameBoard);
    },
  };
})(dave, john);
