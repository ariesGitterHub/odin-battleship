import { createElement, createImgShip } from "./functionTemplates.js";
import { createHitMissGrid } from "./createGrid-HitMiss.js";
import { createShipGrid } from "./createGrid-Ship.js";
import { getBoardElements } from "./domQueries.js";
import bA from "../assets/ship5A-b.svg";
import bB from "../assets/ship4B-b.svg";
import bD from "../assets/ship3D-b.svg";
import bS from "../assets/ship3S-b.svg";
import bC from "../assets/ship2C-b.svg";

function createPlayerBoardSection(playerNum) {
  return {
    fullBoard: createElement("div", { id: `p${playerNum}-full-board` }),
    playerNumText: createElement(
      "div",
      { id: `p${playerNum}-player-num-text` },
      `Player ${playerNum}`
    ),
    placeShips: createElement("div", { id: `p${playerNum}-place-ships` }),
    x5Grid: createElement("div", { id: `p${playerNum}-x5-grid` }),
    deploymentZone: createElement(
      "div",
      { id: `p${playerNum}-deployment-zone` },
      `Deployment Zone`
    ),
    targetZone: createElement(
      "div",
      { id: `p${playerNum}-target-zone` },
      `Enemy Target Zone`
    ),
    shipBoard: createElement("div", { id: `p${playerNum}-ship-board` }),
    hitMissBoard: createElement("div", { id: `p${playerNum}-hit-miss-board` }),
    targetShipBoard: createElement("div", {
      id: `p${playerNum}-target-ship-board`,
    }),
    targetHitMissBoard: createElement("div", {
      id: `p${playerNum}-target-hit-miss-board`,
    }),
    placeShipBtnContainer: createElement("div", {
      id: `p${playerNum}-place-ship-btn-container`,
    }),
  };
}

function createPlaceShipImgs(playerNum) {
  return {
    a: createImgShip(
      `place-a${playerNum}`,
      "a",
      `${bA}`,
      `all-p${playerNum}-place-ships`
    ),
    b: createImgShip(
      `place-b${playerNum}`,
      "b",
      `${bB}`,
      `all-p${playerNum}-place-ships`
    ),
    d: createImgShip(
      `place-d${playerNum}`,
      "d",
      `${bD}`,
      `all-p${playerNum}-place-ships`
    ),
    s: createImgShip(
      `place-s${playerNum}`,
      "s",
      `${bS}`,
      `all-p${playerNum}-place-ships`
    ),
    c: createImgShip(
      `place-c${playerNum}`,
      "c",
      `${bC}`,
      `all-p${playerNum}-place-ships`
    ),
  };
}

export function createBoardContainerDivs() {
  const { boardContainer } = getBoardElements();

  const p1Elements = createPlayerBoardSection(1);
  const p2Elements = createPlayerBoardSection(2);
  const p1PlaceShips = createPlaceShipImgs(1);
  const p2PlaceShips = createPlaceShipImgs(2);

  boardContainer.append(p1Elements.fullBoard, p2Elements.fullBoard);

  p1Elements.fullBoard.append(
    p1Elements.playerNumText,
    p1Elements.placeShips,
    p1Elements.deploymentZone,
    p1Elements.targetZone
  );
  p1Elements.placeShips.append(
    p1Elements.placeShipBtnContainer,
    p1Elements.x5Grid
  );
  p1Elements.x5Grid.append(
    p1PlaceShips.s,
    p1PlaceShips.b,
    p1PlaceShips.a,
    p1PlaceShips.d,
    p1PlaceShips.c
  );
  p1Elements.deploymentZone.append(
    p1Elements.shipBoard,
    p1Elements.hitMissBoard
  );
  p1Elements.targetZone.append(
    p1Elements.targetShipBoard,
    p1Elements.targetHitMissBoard
  );

  p2Elements.fullBoard.append(
    p2Elements.playerNumText,
    p2Elements.placeShips,
    p2Elements.deploymentZone,
    p2Elements.targetZone
  );
  p2Elements.placeShips.append(
    p2Elements.placeShipBtnContainer,
    p2Elements.x5Grid
  );
  p2Elements.x5Grid.append(
    p2PlaceShips.s,
    p2PlaceShips.b,
    p2PlaceShips.a,
    p2PlaceShips.d,
    p2PlaceShips.c
  );
  p2Elements.deploymentZone.append(
    p2Elements.shipBoard,
    p2Elements.hitMissBoard
  );
  p2Elements.targetZone.append(
    p2Elements.targetShipBoard,
    p2Elements.targetHitMissBoard
  );
}

export function displayBoardContent(board) {
  const {
    p1ShipBoard,
    p1HitMissBoard,
    p1TargetShipBoard,
    p1TargetHitMissBoard,
    p2ShipBoard,
    p2HitMissBoard,
    p2TargetShipBoard,
    p2TargetHitMissBoard,
  } = getBoardElements();

  const shipGridCells1 = createShipGrid(board, 1, "deployZone");
  shipGridCells1.forEach((cell) => {
    p1ShipBoard.appendChild(cell);
  });

  const hitMissGridCells1 = createHitMissGrid(board, 1, "deployZone");
  hitMissGridCells1.forEach((cell) => {
    p1HitMissBoard.appendChild(cell);
  });

  // Note that targetShipGridCells1 links to board 2 of the opponent
  const targetShipGridCells1 = createShipGrid(board, 2, "targetZone");
  targetShipGridCells1.forEach((cell) => {
    p1TargetShipBoard.appendChild(cell);
  });

  // Note that targetHitMissGridCells1 links to board 2 of the opponent
  const targetHitMissGridCells1 = createHitMissGrid(board, 2, "targetZone");
  targetHitMissGridCells1.forEach((cell) => {
    p1TargetHitMissBoard.appendChild(cell);
  });

  const shipGridCells2 = createShipGrid(board, 2, "deployZone");
  shipGridCells2.forEach((cell) => {
    p2ShipBoard.appendChild(cell);
  });

  const hitMissGridCells2 = createHitMissGrid(board, 2, "deployZone");
  hitMissGridCells2.forEach((cell) => {
    p2HitMissBoard.appendChild(cell);
  });

  // Note that targetShipGridCells2 links to board 1 of the opponent
  const targetShipGridCells2 = createShipGrid(board, 1, "targetZone");
  targetShipGridCells2.forEach((cell) => {
    p2TargetShipBoard.appendChild(cell);
  });

  // Note that targetHitMissGridCells2 links to board 1 of the opponent
  const targetHitMissGridCells2 = createHitMissGrid(board, 1, "targetZone");
  targetHitMissGridCells2.forEach((cell) => {
    p2TargetHitMissBoard.appendChild(cell);
  });
}
