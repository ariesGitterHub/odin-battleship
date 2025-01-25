import { createElement } from "./basicFunctions.js";
// import { imgMaker } from "./uiImages.js";
import { createImg } from "./basicFunctions.js";
import compass from "../assets/compass.svg";
import a from "../assets/ship5A.svg";
import b from "../assets/ship4B.svg";
import d from "../assets/ship3D.svg";
import s from "../assets/ship3S.svg";
import c from "../assets/ship2C.svg";
// import p from "../assets/ship1P.svg";
import bA from "../assets/ship5A-b.svg";
import bB from "../assets/ship4B-b.svg";
import bD from "../assets/ship3D-b.svg";
import bS from "../assets/ship3S-b.svg";
import bC from "../assets/ship2C-b.svg";
// import bP from "../assets/ship1P-b.svg";
import rA from "../assets/ship5A-r.svg";
import rB from "../assets/ship4B-r.svg";
import rD from "../assets/ship3D-r.svg";
import rS from "../assets/ship3S-r.svg";
import rC from "../assets/ship2C-r.svg";
// import rP from "../assets/ship1P-r.svg";
import { createImgShip } from "./uiImages.js";

import {
  createHitMissGrid,
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

  const p0PlaceShips = createElement(
    "div",
    {
      id: "p0-place-ships",
    },
    "Click on a ship type to highlight it, then drag it to the desired deployment zone square. Click the rotate button to change ship axis."
  );

  // const p1Compass = createElement("div", {
  //   id: "p1-compass",
  // });

  // const imgCompass = createImg({
  //   src: compass,
  //   alt: "circle element",
  //   class: "circle",
  // });

  const p0X5Grid = createElement("div", {
    id: "p0-x5-grid",
  });
  const a = createImgShip("place-a", "a", `${bA}`, "place-ship");
  const b = createImgShip("place-b", "b", `${bB}`, "place-ship");
  const d = createImgShip("place-d", "d", `${bD}`, "place-ship");
  const s = createImgShip("place-s", "s", `${bS}`, "place-ship");
  const c = createImgShip("place-c", "c", `${bC}`, "place-ship");

  const p0BtnContainer =  createElement("div", {
    id: "p0-btn-container",
  });

  const p0BtnRotate = createElement(
    "button",
    { id: "p0-btn-rotate", class: "btn-b text-effect-dark" },
    "Rotate"
  );

  const p0BtnUndo = createElement(
    "button",
    { id: "p0-btn-undo", class: "btn-b text-effect-dark" },
    "Undo"
  );

    const p0BtnClear = createElement(
      "button",
      { id: "p0-btn-clear", class: "btn-b text-effect-dark" },
      "Clear"
    );

  const p0BtnRandom = createElement(
    "button",
    { id: "p0-btn-random", class: "btn-b text-effect-dark" },
    "Random"
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
  p1FullBoard.append(p0PlaceShips, p1DeploymentZone, p1TargetZone);
  p0PlaceShips.append(
    p0X5Grid,
    // p1Compass,
     p0BtnContainer);
  // p1Compass.append(imgCompass, p1X5Grid);
  // p1Compass.append(p1X5Grid);
  // p1X5Grid.append(b4, c2, d3, a5, s3);
  p0X5Grid.append(a, b, d, s, c);
p0BtnContainer.append(p0BtnRotate, p0BtnUndo, p0BtnClear, p0BtnRandom);

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

  // const hitMissGridCells1 = createHitMissGrid1(board);
  const hitMissGridCells1 = createHitMissGrid(board, 1, "normal");
  hitMissGridCells1.forEach((cell) => {
    p1StatusBoard.appendChild(cell);
  });

  const targetShipGridCells1 = createTargetShipGrid2(board);
  targetShipGridCells1.forEach((cell) => {
    p1TargetShipBoard.appendChild(cell);
  });

  // const targetHitMissGridCells1 = createTargetHitMissGrid2(board);
   const targetHitMissGridCells1 = createHitMissGrid(board, 2, "target");
  targetHitMissGridCells1.forEach((cell) => {
    p1TargetStatusBoard.appendChild(cell);
  });

  const shipGridCells2 = createShipGrid2(board);
  shipGridCells2.forEach((cell) => {
    p2ShipBoard.appendChild(cell);
  });

  // const hitMissGridCells2 = createHitMissGrid2(board);
   const hitMissGridCells2 = createHitMissGrid(board, 2, "normal");
  hitMissGridCells2.forEach((cell) => {
    p2StatusBoard.appendChild(cell);
  });

  const targetShipGridCells2 = createTargetShipGrid1(board);
  targetShipGridCells2.forEach((cell) => {
    p2TargetShipBoard.appendChild(cell);
  });

  // const targetHitMissGridCells2 = createTargetHitMissGrid1(board);
    const targetHitMissGridCells2 = createHitMissGrid(board, 1, "target");
  targetHitMissGridCells2.forEach((cell) => {
    p2TargetStatusBoard.appendChild(cell);
  });
}
