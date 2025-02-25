import { createElement, createImgShip } from "./functionTemplates.js";
import { createHitMissGrid } from "./createGrid-HitMiss.js";
import { createShipGrid } from "./createGrid-Ship.js";
import { getBoardElements } from "./domQueries.js";
import bA from "../assets/ship5A-b.svg";
import bB from "../assets/ship4B-b.svg";
import bD from "../assets/ship3D-b.svg";
import bS from "../assets/ship3S-b.svg";
import bC from "../assets/ship2C-b.svg";

  // const p1FullBoard = createElement(
  //   "div",
  //   {
  //     id: "p1-full-board",
  //   },
  //   p1
  // );

  // const p2FullBoard = createElement(
  //   "div",
  //   {
  //     id: "p2-full-board",
  //   },
  //   p2
  // );

  // const p1PlaceShips = createElement("div", {
  //   id: "p1-place-ships",
  // });

  // const p2PlaceShips = createElement("div", {
  //   id: "p2-place-ships",
  // });

  // const p1X5Grid = createElement("div", {
  //   id: "p1-x5-grid",
  // });

  // const p2X5Grid = createElement("div", {
  //   id: "p2-x5-grid",
  // });

  // const a1 = createImgShip("place-a1", "a", `${bA}`, "all-p1-place-ships");
  // const b1 = createImgShip("place-b1", "b", `${bB}`, "all-p1-place-ships");
  // const d1 = createImgShip("place-d1", "d", `${bD}`, "all-p1-place-ships");
  // const s1 = createImgShip("place-s1", "s", `${bS}`, "all-p1-place-ships");
  // const c1 = createImgShip("place-c1", "c", `${bC}`, "all-p1-place-ships");

  // const a2 = createImgShip("place-a2", "a", `${bA}`, "all-p2-place-ships");
  // const b2 = createImgShip("place-b2", "b", `${bB}`, "all-p2-place-ships");
  // const d2 = createImgShip("place-d2", "d", `${bD}`, "all-p2-place-ships");
  // const s2 = createImgShip("place-s2", "s", `${bS}`, "all-p2-place-ships");
  // const c2 = createImgShip("place-c2", "c", `${bC}`, "all-p2-place-ships");

  // const p1BtnContainer = createElement("div", {
  //   id: "p1-place-ship-btn-container",
  // });

  // const p2BtnContainer = createElement("div", {
  //   id: "p2-place-ship-btn-container",
  // });

  // const p1DeploymentZone = createElement(
  //   "div",
  //   {
  //     id: "p1-deployment-zone",
  //   },
  //   `${p1}${deployZoneMsg}`
  // );

  // const p1TargetZone = createElement(
  //   "div",
  //   {
  //     id: "p1-target-zone",
  //   },
  //   `${p1}${targetZoneMsg}`
  // );

  // const p2DeploymentZone = createElement(
  //   "div",
  //   {
  //     id: "p2-deployment-zone",
  //   },
  //   `${p2}${deployZoneMsg}`
  // );

  // const p2TargetZone = createElement(
  //   "div",
  //   {
  //     id: "p2-target-zone",
  //   },
  //   `${p1}${targetZoneMsg}`
  // );

  // const p1ShipBoard = createElement("div", {
  //   id: "p1-ship-board",
  // });

  // const p1HitMissBoard = createElement("div", {
  //   id: "p1-hit-miss-board",
  // });

  // // This is really P2's ship and status board, but it appears in P1 side as the place that is targeted.
  // const p1TargetShipBoard = createElement("div", {
  //   id: "p1-target-ship-board",
  // });

  // const p1TargetHitMissBoard = createElement("div", {
  //   id: "p1-target-hit-miss-board",
  // });

  // const p2ShipBoard = createElement("div", {
  //   id: "p2-ship-board",
  // });

  // const p2HitMissBoard = createElement("div", {
  //   id: "p2-hit-miss-board",
  // });

  // // This is really P1's ship and status board, but it appears in P2 side as the place that is targeted.
  // const p2TargetShipBoard = createElement("div", {
  //   id: "p2-target-ship-board",
  // });

  // const p2TargetHitMissBoard = createElement("div", {
  //   id: "p2-target-hit-miss-board",
  // });
  // boardContainer.append(p1FullBoard, p2FullBoard);
  // p1FullBoard.append(p1PlaceShips, p1DeploymentZone, p1TargetZone);
  // p1PlaceShips.append(p1X5Grid, p1BtnContainer);
  // p1X5Grid.append(s1, b1, a1, d1, c1);
  // p1DeploymentZone.append(p1ShipBoard, p1HitMissBoard);
  // p1TargetZone.append(p1TargetShipBoard, p1TargetHitMissBoard);
  // p2FullBoard.append(p2PlaceShips, p2DeploymentZone, p2TargetZone);
  // p2PlaceShips.append(p2X5Grid, p2BtnContainer);
  // p2X5Grid.append(s2, b2, a2, d2, c2);
  // p2DeploymentZone.append(p2ShipBoard, p2HitMissBoard);
  // p2TargetZone.append(p2TargetShipBoard, p2TargetHitMissBoard);

function createPlayerBoardSection(playerNum) {
  return {
    fullBoard: createElement(
      "div",
      { id: `p${playerNum}-full-board`, class: "flip-full-board", },
      `Player ${playerNum}`
    ),
    placeShips: createElement("div", { id: `p${playerNum}-place-ships` }),
    x5Grid: createElement("div", { id: `p${playerNum}-x5-grid` }),
    deploymentZone: createElement(
      "div",
      { id: `p${playerNum}-deployment-zone` },
      `Player ${playerNum}'s Ship Deployment Zone`
    ),
    targetZone: createElement(
      "div",
      { id: `p${playerNum}-target-zone` },
      `Player ${playerNum}'s Enemy Target Zone`
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
    a: createImgShip(`place-a${playerNum}`, "a", `${bA}`, `all-p${playerNum}-place-ships`),
    b: createImgShip(`place-b${playerNum}`, "b", `${bB}`, `all-p${playerNum}-place-ships`),
    d: createImgShip(`place-d${playerNum}`, "d", `${bD}`, `all-p${playerNum}-place-ships`),
    s: createImgShip(`place-s${playerNum}`, "s", `${bS}`, `all-p${playerNum}-place-ships`),
    c: createImgShip(`place-c${playerNum}`, "c", `${bC}`, `all-p${playerNum}-place-ships`),
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
    p1Elements.placeShips,
    p1Elements.deploymentZone,
    p1Elements.targetZone
  );
  p1Elements.placeShips.append(
    p1Elements.x5Grid,
    p1Elements.placeShipBtnContainer
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
    p2Elements.placeShips,
    p2Elements.deploymentZone,
    p2Elements.targetZone
  );
  p2Elements.placeShips.append(
    p2Elements.x5Grid,
    p2Elements.placeShipBtnContainer
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
  // const p1ShipBoard = document.querySelector("#p1-ship-board");
  // const p1HitMissBoard = document.querySelector("#p1-hit-miss-board");

  // const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
  // const p1TargetHitMissBoard = document.querySelector(
  //   "#p1-target-hit-miss-board"
  // );
  // const p2ShipBoard = document.querySelector("#p2-ship-board");
  // const p2HitMissBoard = document.querySelector("#p2-hit-miss-board");

  // const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
  // const p2TargetHitMissBoard = document.querySelector(
  //   "#p2-target-hit-miss-board"
  // );

  // const { p1ShipBoard } = getBoardElements();
  // const { p1HitMissBoard } = getBoardElements();
  // const { p1TargetShipBoard } = getBoardElements();
  // const { p1TargetHitMissBoard } = getBoardElements();
  // const { p2ShipBoard } = getBoardElements();
  // const { p2HitMissBoard } = getBoardElements();
  // const { p2TargetShipBoard } = getBoardElements();
  // const { p2TargetHitMissBoard } = getBoardElements();

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
