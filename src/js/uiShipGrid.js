import { createElement } from "./basicFunctions.js";
// import { Ship } from "./ship.js";
// import { Gameboard } from "./gameboard.js";
import { createImg } from "./basicFunctions.js";
import a from "../assets/ship5A.svg";
import b from "../assets/ship4B.svg";
import d from "../assets/ship3D.svg";
import s from "../assets/ship3S.svg";
import c from "../assets/ship2C.svg";
// import p from "../assets/ship1P.svg";

export function createShipGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `SG1: (${i},${j})`,
        class: "ship-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetShipGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-SG1: (${i},${j})`,
        class: "ship-cells1 ship-target-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createShipGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `SG2: (${i},${j})`,
        class: "ship-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetShipGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-SG2: (${i},${j})`,
        class: "ship-cells2 ship-target-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function placeShipSvgs1(shipType, axis, x, y) {
  const p1ShipBoardCellIndex = document.getElementById(`SG1: (${x},${y})`);
  if (shipType === "a") {
    const p1A5 = createImg({
      src: a,
      alt: "aircraft carrier image",
      class: "ship",
    });
    if (axis === "v") {
      p1A5.style.transform = "translateY(4rem) rotate(90deg)";
    } else {
      p1A5.style.transform = "translateX(4rem)";
    }
    p1ShipBoardCellIndex.appendChild(p1A5);
  }

  if (shipType === "b") {
    const p1B4 = createImg({
      src: b,
      alt: "battleship image",
      class: "ship",
    });
    if (axis === "v") {
      p1B4.style.transform = "translateY(3rem) rotate(90deg)";
    } else {
      p1B4.style.transform = "translateX(3rem)";
    }
    p1ShipBoardCellIndex.appendChild(p1B4);
  }

  if (shipType === "d") {
    const p1D3 = createImg({
      src: d,
      alt: "destroyer image",
      class: "ship",
    });
    if (axis === "v") {
      p1D3.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      p1D3.style.transform = "translateX(2rem)";
    }
    p1ShipBoardCellIndex.appendChild(p1D3);
  }

  if (shipType === "s") {
    const p1S3 = createImg({
      src: s,
      alt: "submarine image",
      class: "ship",
    });
    if (axis === "v") {
      p1S3.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      p1S3.style.transform = "translateX(2rem)";
    }
    p1ShipBoardCellIndex.appendChild(p1S3);
  }

  if (shipType === "c") {
    const p1C2 = createImg({
      src: c,
      alt: "corvette image",
      class: "ship",
    });
    if (axis === "v") {
      p1C2.style.transform = "translateY(1rem) rotate(90deg)";
    } else {
      p1C2.style.transform = "translateX(1rem)";
    }
    p1ShipBoardCellIndex.appendChild(p1C2);
  }
}

export function placeShipSvgs2(shipType, axis, x, y) {
  const p2ShipBoardCellIndex = document.getElementById(`SG2: (${x},${y})`);
  if (shipType === "a") {
    const p2A5 = createImg({
      src: a,
      alt: "aircraft carrier image",
      class: "ship",
    });
    if (axis === "v") {
      p2A5.style.transform = "translateY(4rem) rotate(90deg)";
    } else {
      p2A5.style.transform = "translateX(4rem)";
    }
    p2ShipBoardCellIndex.appendChild(p2A5);
  }

  if (shipType === "b") {
    const p2B4 = createImg({
      src: b,
      alt: "battleship image",
      class: "ship",
    });
    if (axis === "v") {
      p2B4.style.transform = "translateY(3rem) rotate(90deg)";
    } else {
      p2B4.style.transform = "translateX(3rem)";
    }
    p2ShipBoardCellIndex.appendChild(p2B4);
  }

  if (shipType === "d") {
    const p2D3 = createImg({
      src: d,
      alt: "destroyer image",
      class: "ship",
    });
    if (axis === "v") {
      p2D3.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      p2D3.style.transform = "translateX(2rem)";
    }
    p2ShipBoardCellIndex.appendChild(p2D3);
  }

  if (shipType === "s") {
    const p2S3 = createImg({
      src: s,
      alt: "submarine image",
      class: "ship",
    });
    if (axis === "v") {
      p2S3.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      p2S3.style.transform = "translateX(2rem)";
    }
    p2ShipBoardCellIndex.appendChild(p2S3);
  }

  if (shipType === "c") {
    const p2C2 = createImg({
      src: c,
      alt: "corvette image",
      class: "ship",
    });
    if (axis === "v") {
      p2C2.style.transform = "translateY(1rem) rotate(90deg)";
    } else {
      p2C2.style.transform = "translateX(1rem)";
    }
    p2ShipBoardCellIndex.appendChild(p2C2);
  }
}
