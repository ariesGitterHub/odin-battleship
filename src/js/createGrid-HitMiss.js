import { createElement } from "./functionTemplates.js";

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
