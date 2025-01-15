import { createElement } from "./basicFunctions.js";

export function createShipGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement(
        "div",
        {
          id: `SG1: (${i},${j})`,
          class: "ship-cells1",
        }
      );
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createShipGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement(
        "div",
        {
          id: `SG2: (${i},${j})`,
          class: "ship-cells2",
        }
      );
      grid.push(gridCell);
    }
  }
  return grid;
}

export function addShipColor1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`SG1: (${i},${j})`);
      if (board[i][j] === "a" || board[i][j] === "A!") {
        cell.style.backgroundColor = "var(--pur)";
      }
      if (board[i][j] === "b" || board[i][j] === "B!") {
        cell.style.backgroundColor = "var(--blu)";
      }
      if (board[i][j] === "d" || board[i][j] === "D!") {
        cell.style.backgroundColor = "var(--grn)";
      }
      if (board[i][j] === "s" || board[i][j] === "S!") {
        cell.style.backgroundColor = "var(--yel)";
      }
      if (board[i][j] === "c" || board[i][j] === "C!") {
        cell.style.backgroundColor = "var(--org)";
      }
      // if (board[i][j] === "p" || board[i][j] === "P!") {
      //   cell.style.backgroundColor = "var(--red)";
      // }
    }
  }
}

export function addShipColor2(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`SG2: (${i},${j})`);
      if (board[i][j] === "a" || board[i][j] === "A!") {
        cell.style.backgroundColor = "var(--pur)";
      }
      if (board[i][j] === "b" || board[i][j] === "B!") {
        cell.style.backgroundColor = "var(--blu)";
      }
      if (board[i][j] === "d" || board[i][j] === "D!") {
        cell.style.backgroundColor = "var(--grn)";
      }
      if (board[i][j] === "s" || board[i][j] === "S!") {
        cell.style.backgroundColor = "var(--yel)";
      }
      if (board[i][j] === "c" || board[i][j] === "C!") {
        cell.style.backgroundColor = "var(--org)";
      }
      // if (board[i][j] === "p" || board[i][j] === "P!") {
      //   cell.style.backgroundColor = "var(--red)";
      // }
    }
  }
}