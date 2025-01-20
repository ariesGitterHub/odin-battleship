import { createElement } from "./basicFunctions.js";
// import { imgMaker } from "./uiImages.js";
// import { createImg } from "./basicFunctions.js";

import {
  createHitMissGrid1,
  createHitMissGrid2,
  createTargetHitMissGrid1,
  createTargetHitMissGrid2,
} from "./uiHitMissGrid.js";
import {
  createShipGrid1,
  createShipGrid2,
  createTargetShipGrid1,
  createTargetShipGrid2,
} from "./uiShipGrid.js";

export function createGameContentDivs() {
  // This is where the two player containers and board container are created; use this to alter the order of elements between mobile and large screen viewports.
  const gameContent = document.querySelector("#game-content");
  // gameContent.classList.add("flex-row");
  const boardContainer = createElement("div", {
    id: "board-container",
  });

  const p1FullBoard = createElement(
    "div",
    {
      id: "p1-full-board",
    },
    "Player One"
  );

  const p2FullBoard = createElement(
    "div",
    {
      id: "p2-full-board",
    },
    "Player Two"
  );

  const p1DeploymentZone = createElement(
    "div",
    {
      id: "p1-deployment-zone",
    },
    "Ally Ship Deployment Zone"
  );

  const p1TargetZone = createElement(
    "div",
    {
      id: "p1-target-zone",
    },
    "Enemy Target Zone"
  );

  const p2DeploymentZone = createElement(
    "div",
    {
      id: "p2-deployment-zone",
    },
    "Ally Ship Deployment Zone"
  );

  const p2TargetZone = createElement(
    "div",
    {
      id: "p2-target-zone",
    },
    "Enemy Target Zone"
  );

  const p1ShipBoard = createElement("div", {
    id: "p1-ship-board",
  });

  const p1StatusBoard = createElement("div", {
    id: "p1-status-board",
  });

  // This is really P2's ship and status board, but it appears in P1 side as the place that is targeted.
  const p1TargetShipBoard = createElement("div", {
    id: "p1-target-ship-board",
  });

  const p1TargetStatusBoard = createElement("div", {
    id: "p1-target-status-board",
  });

  const p2ShipBoard = createElement("div", {
    id: "p2-ship-board",
  });

  const p2StatusBoard = createElement("div", {
    id: "p2-status-board",
  });

  // This is really P1's ship and status board, but it appears in P2 side as the place that is targeted.
  const p2TargetShipBoard = createElement("div", {
    id: "p2-target-ship-board",
  });

  const p2TargetStatusBoard = createElement("div", {
    id: "p2-target-status-board",
  });

  gameContent.appendChild(boardContainer);
  boardContainer.append(p1FullBoard, p2FullBoard);
  // p1FullBoard.append(p1ShipBoard, p1StatusBoard);
  // p2FullBoard.append(p2ShipBoard, p2StatusBoard)

  // HIDING BELOW SHOWS JUST "PLAYER ONE" TEXT AND GIVES PLAYER TWO CONTROL OF THE GAME VIEW
  p1FullBoard.append(p1DeploymentZone, p1TargetZone);
  p1DeploymentZone.append(p1ShipBoard, p1StatusBoard);
  // p1TargetZone.append(p2ShipBoard, p2StatusBoard);
  p1TargetZone.append(p1TargetShipBoard, p1TargetStatusBoard);

  // HIDING BELOW SHOWS JUST "PLAYER TWO" TEXT AND GIVES PLAYER ONE CONTROL OF THE GAME VIEW
  p2FullBoard.append(p2DeploymentZone, p2TargetZone);
  p2DeploymentZone.append(p2ShipBoard, p2StatusBoard);
  // p2TargetZone.append(p1ShipBoard, p1StatusBoard);
  p2TargetZone.append(p2TargetShipBoard, p2TargetStatusBoard);
}

export function createGameContent(board) {
  const p1ShipBoard = document.querySelector("#p1-ship-board");
  const p1StatusBoard = document.querySelector("#p1-status-board");

  const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
  const p1TargetStatusBoard = document.querySelector("#p1-target-status-board");

  const p2ShipBoard = document.querySelector("#p2-ship-board");
  const p2StatusBoard = document.querySelector("#p2-status-board");

  const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
  const p2TargetStatusBoard = document.querySelector("#p2-target-status-board");

  const shipGridCells1 = createShipGrid1(board);
  shipGridCells1.forEach((cell) => {
    p1ShipBoard.appendChild(cell);
  });

  const hitMissGridCells1 = createHitMissGrid1(board);
  hitMissGridCells1.forEach((cell) => {
    p1StatusBoard.appendChild(cell);
  });

  const targetShipGridCells1 = createTargetShipGrid2(board);
  targetShipGridCells1.forEach((cell) => {
    p1TargetShipBoard.appendChild(cell);
  });

  const targetHitMissGridCells1 = createTargetHitMissGrid2(board);
  targetHitMissGridCells1.forEach((cell) => {
    p1TargetStatusBoard.appendChild(cell);
  });

  const shipGridCells2 = createShipGrid2(board);
  shipGridCells2.forEach((cell) => {
    p2ShipBoard.appendChild(cell);
  });

  const hitMissGridCells2 = createHitMissGrid2(board);
  hitMissGridCells2.forEach((cell) => {
    p2StatusBoard.appendChild(cell);
  });

  const targetShipGridCells2 = createTargetShipGrid1(board);
  targetShipGridCells2.forEach((cell) => {
    p2TargetShipBoard.appendChild(cell);
  });

  const targetHitMissGridCells2 = createTargetHitMissGrid1(board);
  targetHitMissGridCells2.forEach((cell) => {
    p2TargetStatusBoard.appendChild(cell);
  });
}
