const game = (() => {
  // player 1 is true, player 2 is false
  const playerOneSymbol = "x";
  const playerTwoSymbol = "o";
  let gameBoard = new Array(9);
  const container = document.querySelector("#gameboard");
  let counter = 0;
  const gameInfo = document.querySelector(`#game-info`);
  const resetButton = document.querySelector(`#reset-button`);

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
  });

  const attachCellEvent = (id, cell) => {
    cell.addEventListener("click", () => {
      const result = evaluateCounter();
      if (gameBoard.at(id) === undefined) {
        addUnit(id, result);
        displayUnit(cell, result);
        if (evaluateBoard() === "tie") {
          gameInfo.textContent = "its a tie";
          resetButton.classList.toggle("hidden");
        } else if (evaluateBoard() === true) {
          gameInfo.textContent = "x is winner";
          resetButton.classList.toggle("hidden");
        } else if (evaluateBoard() === false) {
          gameInfo.textContent = "o is winner";
          resetButton.classList.toggle("hidden");
        }
      }
    });
  };

  return {
    createCells() {
      for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement("button");
        cell.setAttribute("id", `cell-${i}`);
        container.appendChild(cell);
        attachCellEvent(i, cell);
      }
    },

    destroyCells() {
      for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.querySelector(`#cell-${i}`);
        container.removeChild(cell);
      }
    },

    resetBoard() {
      gameBoard.fill(undefined);
      this.destroyCells();
      this.createCells();
      gameInfo.textContent = "";
    },

    // Debugging only

    getGameBoard() {
      console.table(gameBoard);
    },
  };
})();

game.createCells();
