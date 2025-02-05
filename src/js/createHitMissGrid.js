import { createElement } from "./basicFunctionTemplates.js";

export function createHitMissGrid(board, boardNum, gridType) {
  let grid = [];
  const idPrefix =
    gridType === "targetZone" ? `T-HMG${boardNum}` : `HMG${boardNum}`;
  const cellClass =
    gridType === "targetZone"
      ? `hit-miss-target-cells${boardNum}`
      : `hit-miss-cells${boardNum}`;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `${idPrefix}: (${i},${j})`,
        class: cellClass,
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function addEmojiEffect(board, boardNum) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const baseId = `${boardNum === 1 ? "HMG1" : "HMG2"}: (${i},${j})`;
      let cell = document.getElementById(baseId);
      let cellTarget = document.getElementById(`T-${baseId}`);
      let cellShipTarget = document.getElementById(
        `T-SG${boardNum}: (${i},${j})`
      );

      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        cellTarget.innerText = "💥";
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

export function highlightEmptyCellOnlyOnHover(board, boardNum) {
  const placeShipsId = boardNum === 1 ? "#p1-place-ships" : "#p2-place-ships";
  // console.log("placeShipsId:", placeShipsId);
  const placeShips = document.querySelector(placeShipsId);
  // console.log("placeShips:", placeShips);
  
  const targetZoneId = boardNum === 1 ? "#p1-target-zone" : "#p2-target-zone";
  const targetZone = document.querySelector(targetZoneId);

  // const targetZoneId1 = "#p1-target-zone";
  // const targetZone1 = document.querySelector(targetZoneId1);
 
  const validTargetSymbols = ["--", "a", "b", "d", "s", "c"];
  const validDeploySymbols = ["--"];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy = document.getElementById(
        `HMG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );
      let cellTarget = document.getElementById(
        `T-HMG${boardNum === 1 ? 1 : 2}: (${i},${j})`
      );

      // if (
      //   board[i][j] === "--" ||
      //   board[i][j] === "a" ||
      //   board[i][j] === "b" ||
      //   board[i][j] === "d" ||
      //   board[i][j] === "s" ||
      //   board[i][j] === "c"
      // ) 
      // {
      if (validTargetSymbols.includes(board[i][j])) {
        cellTarget.classList.add("mouse-target");
      } else {
        cellTarget.classList.remove("mouse-target");
      }


      // if (boardNum === 1 && targetZone1.style.display !== "none") {
      //   cellDeploy.classList.remove("mouse-deploy");
      // } 
      if (placeShips.style === "none") {
        cellDeploy.classList.remove("mouse-deploy");
      } else if (targetZone.style.display === "flex") {
        cellDeploy.classList.remove("mouse-deploy");
      } 
      // else if (placeShips.style === "flex") {
      //   cellDeploy.classList.add("mouse-deploy");
      // }
       else if (validDeploySymbols.includes(board[i][j])) {
        cellDeploy.classList.add("mouse-deploy");
      } 
      // else {
      //   cellDeploy.classList.remove("mouse-deploy");
      // }
    }
  }
}