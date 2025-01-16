import { createElement } from "./basicFunctions.js";

export function createHitMissGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement(
        "div",
        {
          id: `HMG1: (${i},${j})`,
          class: "hit-miss-cells1",
        }
      );
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createHitMissGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement(
        "div",
        {
          id: `HMG2: (${i},${j})`,
          class: "hit-miss-cells2",
        }
      );
      grid.push(gridCell);
    }
  }
  return grid;
}

export function addEmojiEffect1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG1: (${i},${j})`);
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!" // ||
        // board[i][j] === "P!"
      ) {
        cell.innerText = "💥";
        cell.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
      } else if (board[i][j] === "mm") {
        // cell.innerText = "⚪";
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)"
      } else {
        cell.innerText = "  ";
      }
    }
  }
}

export function addEmojiEffect2(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG2: (${i},${j})`);
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!" // ||
        // board[i][j] === "P!"
      ) {
        cell.innerText = "💥";
        cell.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
      } else if (board[i][j] === "mm") {
        // cell.innerText = "⚪";
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
      } else {
        cell.innerText = "  ";
      }
    }
  }
}
