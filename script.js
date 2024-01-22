const app = (() => {
  // Containers
  const startGameContainer = document.querySelector(`#start-game`);
  const mainGameContainer = document.querySelector(`#main-game`);
  const gameResultsContainer = document.querySelector(`#game-results`);

  // Buttons
  const startGameButton = document.querySelector(`#start-game-button`);
  const resetButton = document.querySelector(`#reset-button`);
  const finishButton = document.querySelector(`#finish-button`);
  const restartButton = document.querySelector(`#restart-button`);

  let currentFigure1;
  let currentFigure2;
  const figureArray = ["o", "x", "z", "l", "o", "x", "z", "l"];

  for (let i = 0; i < figureArray.length; i++) {
    let playerNumber = Math.ceil(i / 3.99);
    if (playerNumber === 0) {
      playerNumber++;
    }
    const domFigure = document.querySelector(
      `.player${playerNumber} #figure-${figureArray[i]}`
    );
    console.log(domFigure, playerNumber, i);
    domFigure.addEventListener("click", () => {
      if (i < 4) {
        currentFigure1 = `${figureArray[i]}`;
      } else {
        currentFigure2 = `${figureArray[i]}`;
      }
      const domFigureSiblingsArray = Array.from(
        document.querySelectorAll(`.figure${playerNumber}`)
      );
      for (const button of domFigureSiblingsArray) {
        button.classList.remove("highlight");
      }
      domFigure.classList.add("highlight");
    });
  }

  let currentColor1;
  let currentColor2;
  const colorArray = [
    "blue",
    "red",
    "yellow",
    "green",
    "blue",
    "red",
    "yellow",
    "green",
  ];

  for (let i = 0; i < colorArray.length; i++) {
    let playerNumber = Math.ceil(i / 3.99);
    if (playerNumber === 0) {
      playerNumber++;
    }
    const domColor = document.querySelector(
      `.player${playerNumber} #color-${colorArray[i]}`
    );
    domColor.addEventListener("click", () => {
      if (i < 4) {
        currentColor1 = `${colorArray[i]}`;
      } else {
        currentColor2 = `${colorArray[i]}`;
      }
      const domColorSiblingsArray = Array.from(
        document.querySelectorAll(`.color${playerNumber}`)
      );
      for (const button of domColorSiblingsArray) {
        button.classList.remove("highlight");
      }
      domColor.classList.add("highlight");
    });
  }

  // User inputs
  const playerOneNameInput = document.querySelector(`.player-one-input-name`);
  const playerTwoNameInput = document.querySelector(`.player-two-input-name`);

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

  finishButton.addEventListener("click", () => {
    app.toggleGameContainer();
    app.toggleResultsContainer();
  });

  restartButton.addEventListener("click", () => {
    app.toggleResultsContainer();
    app.toggleStartContainer();
  });

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
  let resetActivated = false;

  // player 1 is true, player 2 is false
  const gameboardContainer = document.querySelector("#gameboard");
  const gameInfo = document.querySelector(`#game-info`);
  const player1score = document.querySelector(`#player-two-section > .score`);
  const player2score = document.querySelector(`#player-one-section > .score`);

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
