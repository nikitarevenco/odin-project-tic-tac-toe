const game = (() => {
  const gameBoard = new Array(9);
  const container = document.querySelector("#gameboard");

  let counter = 0;

  const addUnit = (id, bool) => {
    const cell = container.querySelector(`#cell-${id}`);
    if (cell.textContent === "") {
      cell.textContent = bool;
    }
    counter++;
  };

  const evaluateCounter = () => {
    if (counter % 2 === 0) {
      return "x";
    } else {
      return "o";
    }
  };

  return {
    createCells() {
      for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement("button");
        cell.setAttribute("id", `cell-${i}`);
        container.appendChild(cell);
        cell.addEventListener("click", () => {
          addUnit(i, evaluateCounter());
        });
      }
    },
  };
})();

game.createCells();
