const app = (() => {
  // Containers
  const startGameContainer = document.querySelector(`#start-game`);
  const mainGameContainer = document.querySelector(`#main-game`);
  const gameResultsContainer = document.querySelector(`#game-results`);

  // Buttons
  const startGameButton = document.querySelector(`#start-game-button`);
  const resetButton = document.querySelector(`#reset-button`);

  // User inputs
  const playerOneNameInput = document.querySelector(`.player-one-input-name`);
  const playerOneColorInput = document.querySelector(`.player-one-input-color`);
  const playerOneFigureInput = document.querySelector(
    `.player-one-input-figure`
  );
  const playerTwoNameInput = document.querySelector(`.player-two-input-name`);
  const playerTwoColorInput = document.querySelector(`.player-two-input-color`);
  const playerTwoFigureInput = document.querySelector(
    `.player-two-input-figure`
  );

  const toggleResetButton = () => {
    resetButton.classList.toggle("hidden");
  };

  const toggleStartContainer = () => {
    startGameContainer.classList.toggle("hidden");
  };
  const toggleGameContainer = () => {
    mainGameContainer.classList.toggle("hidden");
  };
  const toggleResultsContainer = () => {
    gameResultsContainer.classList.toggle("hidden");
  };

  const createPlayer = (figure, color, name) => {
    return {
      name,
      figure,
      color,
      score: 0,
      addScore() {
        return ++this.score;
      },
    };
  };

  startGameButton.addEventListener("click", () => {
    const player1 = createPlayer(
      playerOneFigureInput.value,
      playerOneColorInput.value,
      playerOneNameInput.value
    );
    const player2 = createPlayer(
      playerTwoFigureInput.value,
      playerTwoColorInput.value,
      playerTwoNameInput.value
    );
    startGameContainer.classList.toggle("hidden");
    toggleGameContainer();
    game(player1, player2);
  });

  return {
    toggleStartContainer,
    toggleGameContainer,
    toggleResultsContainer,
    toggleResetButton,
  };
})();

function game(player1, player2) {
  // Remove me later
  const resetButton = document.querySelector(`#reset-button`);
  //
  let gameBoard = new Array(9);
  let counter = 0;

  // player 1 is true, player 2 is false
  const finishButton = document.querySelector(`#finish-button`);
  const gameboardContainer = document.querySelector("#gameboard");
  const gameInfo = document.querySelector(`#game-info`);

  let resetActivated = false;
  const player1score = document.querySelector(`#player-two-section > .score`);
  const player2score = document.querySelector(`#player-one-section > .score`);
  const restartButton = document.querySelector(`#restart-button`);

  const addUnit = (id, bool) => {
    gameBoard[id] = bool;
    counter++;
  };

  const displayUnit = (cell, bool) => {
    bool
      ? (cell.textContent = player1.figure)
      : (cell.textContent = player2.figure);
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

  finishButton.addEventListener("click", () => {
    app.toggleGameContainer();
    app.toggleResultsContainer();
  });

  restartButton.addEventListener("click", () => {
    app.toggleResultsContainer();
    app.toggleStartContainer();
  });

  resetButton.addEventListener("click", () => {
    app.toggleResetButton();
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
            app.toggleResetButton();
            resetActivated = true;
          } else if (evaluateBoard() === true) {
            gameInfo.textContent = `${player1.name} is winner`;
            player1.addScore();
            player1score.textContent = player1.score;
            app.toggleResetButton();
            resetActivated = true;
          } else if (evaluateBoard() === false) {
            gameInfo.textContent = `${player2.name} is winner`;
            player2.addScore();
            player2score.textContent = player2.score;
            app.toggleResetButton();
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
      gameboardContainer.appendChild(cell);
      attachCellEvent(i, cell);
    }
  };
  createCells();

  const destroyCells = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      const cell = document.querySelector(`#cell-${i}`);
      gameboardContainer.removeChild(cell);
    }
  };

  const resetBoard = () => {
    gameBoard.fill(undefined);
    destroyCells();
    createCells();
    gameInfo.textContent = "";
  };
}
