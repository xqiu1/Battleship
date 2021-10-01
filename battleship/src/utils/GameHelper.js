const BOARD_SIZE = 8;
const SHIP_SIZE = 3;

const columns = {
  0: " ",
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

const makeShips = () => {
  return {
    size: SHIP_SIZE,
    position: [],
    hits: 0,
  };
};

// board status: label or grid
// board label: _(whitespace), S, X
const boardGenerator = () => {
  let board = [];
  let length = BOARD_SIZE + 1;
  for (let i = 0; i < length; i++) {
    let row = [];
    for (let j = 0; j < length; j++) {
      if (i === 0) {
        row.push({ status: "label", label: columns[j] });
      } else if (i !== 0 && j === 0) {
        row.push({ status: "label", label: i });
      } else {
        row.push({ status: "grid", label: " " });
      }
    }
    board.push(row);
  }
  return board;
};

const createPlayer = () => {
  return {
    board: boardGenerator(),
    ship: makeShips(),
    shipSet: false,
  };
};

const whoIsOpponent = (player) => {
  return player === "player1" ? "player2" : "player1";
};

const validateLocation = (row, col, isHorizontal) => {
  if (isHorizontal) {
    return col + SHIP_SIZE - 1 < BOARD_SIZE + 1;
  } else {
    return row + SHIP_SIZE - 1 < BOARD_SIZE + 1;
  }
};

module.exports = {
  createPlayer,
  whoIsOpponent,
  validateLocation,
};
