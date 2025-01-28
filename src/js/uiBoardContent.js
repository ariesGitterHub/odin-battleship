import { createElement } from "./basicFunctions.js";
// import { imgMaker } from "./uiImages.js";
import { createImg } from "./basicFunctions.js";
import radarScreen from "../assets/radarScreen.svg";
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
import hA from "../assets/ship5A-h.svg";
import hB from "../assets/ship4B-h.svg";
import hD from "../assets/ship3D-h.svg";
import hS from "../assets/ship3S-h.svg";
import hC from "../assets/ship2C-h.svg";
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
  createShipGrid,
  // createShipGrid1,
  // createShipGrid2,
  // createTargetShipGrid1,
  // createTargetShipGrid2,
} from "./uiShipGrid.js";

export function createGameContentDivs() {
  const p1 = "Player 1";
  const p2 = "Player 2";
  const deployMsg = "'s Ship Deployment Zone";
  const targetMsg = "'s Enemy Target Zone";
  const rotate = "Rotate";
  const undo = "Undo";
  const clear = "Clear";
  const random = "Random";

  const shipPlacementInstructions = "Rotate ships to the desired vertical or horizontal axis. Click on a ship to highlight it in red, then drag it to the desired deployment zone square."
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
    p1
  );

  const p2FullBoard = createElement(
    "div",
    {
      id: "p2-full-board",
    },
    p2
  );

  const p1PlaceShips = createElement(
    "div",
    {
      id: "p1-place-ships",
    },
    shipPlacementInstructions
  );

    const p2PlaceShips = createElement(
      "div",
      {
        id: "p2-place-ships",
      },
      shipPlacementInstructions
    );

  const p1Circle = createElement("div", {
    id: "p1-circle",
  });

  const imgRadarScreen1 = createImg({
    src: radarScreen,
    alt: "radar screen",
    class: "radar-screen",
  });

    const p2Circle = createElement("div", {
      id: "p2-circle",
    });

    const imgRadarScreen2 = createImg({
      src: radarScreen,
      alt: "radar screen",
      class: "radar-screen",
    });

  const p1X5Grid = createElement("div", {
    id: "p1-x5-grid",
  });

    const p2X5Grid = createElement("div", {
      id: "p2-x5-grid",
    });

  const a1 = createImgShip("place-a1", "a", `${bA}`, "all-p1-place-ships");
  const b1 = createImgShip("place-b1", "b", `${bB}`, "all-p1-place-ships");
  const d1 = createImgShip("place-d1", "d", `${bD}`, "all-p1-place-ships");
  const s1 = createImgShip("place-s1", "s", `${bS}`, "all-p1-place-ships");
  const c1 = createImgShip("place-c1", "c", `${bC}`, "all-p1-place-ships");

    const a2 = createImgShip("place-a2", "a", `${bA}`, "all-p2-place-ships");
    const b2 = createImgShip("place-b2", "b", `${bB}`, "all-p2-place-ships");
    const d2 = createImgShip("place-d2", "d", `${bD}`, "all-p2-place-ships");
    const s2 = createImgShip("place-s2", "s", `${bS}`, "all-p2-place-ships");
    const c2 = createImgShip("place-c2", "c", `${bC}`, "all-p2-place-ships");

  const p1BtnContainer = createElement("div", {
    id: "p1-btn-container",
  });

    const p2BtnContainer = createElement("div", {
      id: "p2-btn-container",
    });

  const p1BtnRotate = createElement(
    "button",
    { id: "p1-btn-rotate", class: "btn-b text-effect-dark" },
    `${rotate}`
  );

    const p2BtnRotate = createElement(
      "button",
      { id: "p2-btn-rotate", class: "btn-b text-effect-dark" },
      `${rotate}`
    );

  const p1BtnUndo = createElement(
    "button",
    { id: "p1-btn-undo", class: "btn-b text-effect-dark" },
    `${undo}`
  );

    const p2BtnUndo = createElement(
      "button",
      { id: "p2-btn-undo", class: "btn-b text-effect-dark" },
      `${undo}`
    );


  const p1BtnClear = createElement(
    "button",
    { id: "p1-btn-clear", class: "btn-b text-effect-dark" },
    `${clear}`
  );

    const p2BtnClear = createElement(
      "button",
      { id: "p2-btn-clear", class: "btn-b text-effect-dark" },
      `${clear}`
    );

  const p1BtnRandom = createElement(
    "button",
    { id: "p1-btn-random", class: "btn-b text-effect-dark" },
    `${random}`
  );

    const p2BtnRandom = createElement(
      "button",
      { id: "p2-btn-random", class: "btn-b text-effect-dark" },
      `${random}`
    );

  const p1DeploymentZone = createElement(
    "div",
    {
      id: "p1-deployment-zone",
    },
    `${p1}${deployMsg}`
  );
  
  const p1TargetZone = createElement(
    "div",
    {
      id: "p1-target-zone",
    },
    `${p1}${targetMsg}`
  );

  const p2DeploymentZone = createElement(
    "div",
    {
      id: "p2-deployment-zone",
    },
    `${p2}${deployMsg}`
  );

  const p2TargetZone = createElement(
    "div",
    {
      id: "p2-target-zone",
    },
    `${p1}${targetMsg}`
  );

  const p1ShipBoard = createElement("div", {
    id: "p1-ship-board",
  });

  const p1HitMissBoard = createElement("div", {
    id: "p1-hit-miss-board",
  });

  // This is really P2's ship and status board, but it appears in P1 side as the place that is targeted.
  const p1TargetShipBoard = createElement("div", {
    id: "p1-target-ship-board",
  });

  const p1TargetHitMissBoard = createElement("div", {
    id: "p1-target-hit-miss-board",
  });

  const p2ShipBoard = createElement("div", {
    id: "p2-ship-board",
  });

  const p2HitMissBoard = createElement("div", {
    id: "p2-hit-miss-board",
  });

  // This is really P1's ship and status board, but it appears in P2 side as the place that is targeted.
  const p2TargetShipBoard = createElement("div", {
    id: "p2-target-ship-board",
  });

  const p2TargetHitMissBoard = createElement("div", {
    id: "p2-target-hit-miss-board",
  });

  gameContent.appendChild(boardContainer);
  boardContainer.append(p1FullBoard, p2FullBoard);
  // p1FullBoard.append(p1ShipBoard, p1HitMissBoard);
  // p2FullBoard.append(p2ShipBoard, p2HitMissBoard)

  // HIDING BELOW SHOWS JUST "PLAYER ONE" TEXT AND GIVES PLAYER TWO CONTROL OF THE GAME VIEW
  p1FullBoard.append(p1PlaceShips, p1DeploymentZone, p1TargetZone);
  p1PlaceShips.append(
    p1X5Grid,
    // p1Circle,
    p1BtnContainer
  );
  p1X5Grid.append(s1, b1, a1, d1, c1);
  // p1Circle.appendChild(imgRadarScreen1);
  p1BtnContainer.append(p1BtnRotate, p1BtnUndo, p1BtnClear, p1BtnRandom);

  p1DeploymentZone.append(p1ShipBoard, p1HitMissBoard);
  // p1TargetZone.append(p2ShipBoard, p2HitMissBoard);
  p1TargetZone.append(p1TargetShipBoard, p1TargetHitMissBoard);

  // HIDING BELOW SHOWS JUST "PLAYER TWO" TEXT AND GIVES PLAYER ONE CONTROL OF THE GAME VIEW
  p2FullBoard.append(p2PlaceShips, p2DeploymentZone, p2TargetZone);
    p2PlaceShips.append(
      p2X5Grid,
      // p2Circle,
      p2BtnContainer
    );
    p2X5Grid.append(s2, b2, a2, d2, c2);
    // p2Circle.appendChild(imgRadarScreen2);
    p2BtnContainer.append(p2BtnRotate, p2BtnUndo, p2BtnClear, p2BtnRandom);

  p2DeploymentZone.append(p2ShipBoard, p2HitMissBoard);
  // p2TargetZone.append(p1ShipBoard, p1HitMissBoard);
  p2TargetZone.append(p2TargetShipBoard, p2TargetHitMissBoard);
}

export function createGameContent(board) {
  const p1ShipBoard = document.querySelector("#p1-ship-board");
  const p1HitMissBoard = document.querySelector("#p1-hit-miss-board");

  const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
  const p1TargetHitMissBoard = document.querySelector(
    "#p1-target-hit-miss-board"
  );

  const p2ShipBoard = document.querySelector("#p2-ship-board");
  const p2HitMissBoard = document.querySelector("#p2-hit-miss-board");

  const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
  const p2TargetHitMissBoard = document.querySelector(
    "#p2-target-hit-miss-board"
  );

  // const shipGridCells1 = createShipGrid1(board);
  const shipGridCells1 = createShipGrid(board, 1, "deployZone");
  shipGridCells1.forEach((cell) => {
    p1ShipBoard.appendChild(cell);
  });

  // const hitMissGridCells1 = createHitMissGrid1(board);
  const hitMissGridCells1 = createHitMissGrid(board, 1, "deployZone");
  hitMissGridCells1.forEach((cell) => {
    p1HitMissBoard.appendChild(cell);
  });

  // const targetShipGridCells1 = createTargetShipGrid2(board);
  const targetShipGridCells1 = createShipGrid(board, 2, "targetZone");
  targetShipGridCells1.forEach((cell) => {
    p1TargetShipBoard.appendChild(cell);
  });

  // const targetHitMissGridCells1 = createTargetHitMissGrid2(board);
  const targetHitMissGridCells1 = createHitMissGrid(board, 2, "targetZone");
  targetHitMissGridCells1.forEach((cell) => {
    p1TargetHitMissBoard.appendChild(cell);
  });

  // const shipGridCells2 = createShipGrid2(board);
  const shipGridCells2 = createShipGrid(board, 2, "deployZone");
  shipGridCells2.forEach((cell) => {
    p2ShipBoard.appendChild(cell);
  });

  // const hitMissGridCells2 = createHitMissGrid2(board);
  const hitMissGridCells2 = createHitMissGrid(board, 2, "deployZone");
  hitMissGridCells2.forEach((cell) => {
    p2HitMissBoard.appendChild(cell);
  });

  // const targetShipGridCells2 = createTargetShipGrid1(board);
   const targetShipGridCells2 = createShipGrid(board, 1, "targetZone");
  targetShipGridCells2.forEach((cell) => {
    p2TargetShipBoard.appendChild(cell);
  });

  // const targetHitMissGridCells2 = createTargetHitMissGrid1(board);
  const targetHitMissGridCells2 = createHitMissGrid(board, 1, "targetZone");
  targetHitMissGridCells2.forEach((cell) => {
    p2TargetHitMissBoard.appendChild(cell);
  });
}
