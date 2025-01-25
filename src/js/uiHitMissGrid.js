import { createElement } from "./basicFunctions.js";

export function createHitMissGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `HMG1: (${i},${j})`,
        class: "hit-miss-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetHitMissGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-HMG1: (${i},${j})`,
        class: "hit-miss-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createHitMissGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `HMG2: (${i},${j})`,
        class: "hit-miss-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetHitMissGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-HMG2: (${i},${j})`,
        class: "hit-miss-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function addEmojiEffect1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG1: (${i},${j})`);
      let cellTarget = document.getElementById(`T-HMG1: (${i},${j})`);
      let cellShipTarget = document.getElementById(`T-SG1: (${i},${j})`);
      const explosionRotation = [0, 90, 180, 270];
      const randomRotation = explosionRotation[Math.floor(Math.random() * explosionRotation.length)
        ];
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        cell.style.transform = `rotate(${randomRotation}deg)`;
        cellTarget.innerText = "💥";
        cellTarget.style.transform = `rotate(${randomRotation}deg)`;
        cellShipTarget.style.backgroundColor = "var(--hit)";
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
      } else {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
      }
    }
  }
}

export function addEmojiEffect2(board) {

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG2: (${i},${j})`);
      let cellTarget = document.getElementById(`T-HMG2: (${i},${j})`);
      let cellShipTarget = document.getElementById(`T-SG2: (${i},${j})`);
      const explosionRotation = [0, 90, 180, 270];
      const randomRotation =
        explosionRotation[
          Math.floor(Math.random() * explosionRotation.length)
        ];
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        cell.style.transform = `rotate(${randomRotation}deg)`;
        cellTarget.innerText = "💥";
        cellTarget.style.transform = `rotate(${randomRotation}deg)`;
        cellShipTarget.style.backgroundColor = "var(--hit)";
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
      } else {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
      }
    }
  }
}

export function highlightEmptyCellOnHover1(board) {
  const p0PlaceShips = document.querySelector("#p0-place-ships");
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy1 = document.getElementById(`HMG1: (${i},${j})`);
      let cellTarget1 = document.getElementById(`T-HMG1: (${i},${j})`);
      if (
        board[i][j] === "--" ||
        board[i][j] === "a" ||
        board[i][j] === "b" ||
        board[i][j] === "d" ||
        board[i][j] === "s" ||
        board[i][j] === "c"
      ) {
        if (p0PlaceShips.style.display === "none") {
          cellDeploy1.classList.add("mouse-deploy");
        }
        cellTarget1.classList.add("mouse-target");
      }
    }
  }
}

export function highlightEmptyCellOnHover2(board) {
  const p0PlaceShips = document.querySelector("#p0-place-ships");
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy2 = document.getElementById(`HMG2: (${i},${j})`);
      let cellTarget2 = document.getElementById(`T-HMG2: (${i},${j})`);
      if (
        board[i][j] === "--" ||
        board[i][j] === "a" ||
        board[i][j] === "b" ||
        board[i][j] === "d" ||
        board[i][j] === "s" ||
        board[i][j] === "c"
      ) {
        if (p0PlaceShips.style.display === "none") {
          cellDeploy2.classList.add("mouse-deploy");
        }
        cellTarget2.classList.add("mouse-target");
      }
    }
  }
}
