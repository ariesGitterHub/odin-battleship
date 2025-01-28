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

// export function createShipGrid1(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `SG1: (${i},${j})`,
//         class: "ship-cells1",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createTargetShipGrid1(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `T-SG1: (${i},${j})`,
//         class: "ship-cells1 ship-target-cells1",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createShipGrid2(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `SG2: (${i},${j})`,
//         class: "ship-cells2",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createTargetShipGrid2(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement("div", {
//         id: `T-SG2: (${i},${j})`,
//         class: "ship-cells2 ship-target-cells2",
//       });
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

export function createShipGrid(board, gameboardNum, gridType) {
  let grid = [];
  const idPrefix =
    gridType === "targetZone" ? `T-SG${gameboardNum}` : `SG${gameboardNum}`;
  const cellClass =
    gridType === "targetZone"
      ? `ship-target-cells${gameboardNum}`
      : `ship-cells${gameboardNum}`;

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

// More concise version of above that is not what I am used to, read up on "flatMap":
// export function createShipGrid(board, gameboardNum, gridType) {
//   const idPrefix =
//     gridType === "targetZone" ? `T-SG${gameboardNum}` : `SG${gameboardNum}`;
//   const cellClass = `${
//     gridType === "targetZone" ? "ship-target-cells" : "ship-cells"
//   }${gameboardNum}`;

//   return board.flatMap((row, i) =>
//     row.map((_, j) =>
//       createElement("div", {
//         id: `${idPrefix}: (${i},${j})`,
//         class: cellClass,
//       })
//     )
//   );
// }


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

export function colorSunkShips1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellShipTarget = document.getElementById(`T-SG1: (${i},${j})`);
      const p1ShipBoard = document.querySelector("#p1-ship-board");
      const p2TargetShipBoard = document.querySelector("#p2-target-ship-board");
      if (testGame1.ships[0].isSunk() && board[i][j] === "A!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[1].isSunk() && board[i][j] === "B!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[2].isSunk() && board[i][j] === "D!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[3].isSunk() && board[i][j] === "S!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame1.ships[4].isSunk() && board[i][j] === "C!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }

      if (
        testGame1.ships[0].isSunk() &&
        testGame1.ships[1].isSunk() &&
        testGame1.ships[2].isSunk() &&
        testGame1.ships[3].isSunk() &&
        testGame1.ships[4].isSunk()
      ) {
        p1ShipBoard.style.backgroundColor = "var(--loser)";
        p2TargetShipBoard.style.backgroundColor = "var(--loser)";
      }
    }
  }
}

export function colorSunkShips2(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellShipTarget = document.getElementById(`T-SG2: (${i},${j})`);
      const p2ShipBoard = document.querySelector("#p2-ship-board");
      const p1TargetShipBoard = document.querySelector("#p1-target-ship-board");
      if (testGame2.ships[0].isSunk() && board[i][j] === "A!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[1].isSunk() && board[i][j] === "B!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[2].isSunk() && board[i][j] === "D!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[3].isSunk() && board[i][j] === "S!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }
      if (testGame2.ships[4].isSunk() && board[i][j] === "C!") {
        cellShipTarget.style.backgroundColor = "var(--text)";
      }

      if (
        testGame2.ships[0].isSunk() &&
        testGame2.ships[1].isSunk() &&
        testGame2.ships[2].isSunk() &&
        testGame2.ships[3].isSunk() &&
        testGame2.ships[4].isSunk()
      ) {
        p2ShipBoard.style.backgroundColor = "var(--loser)";
        p1TargetShipBoard.style.backgroundColor = "var(--loser)";
      }
    }
  }
}

// export function colorSunkShips(board, gameNum) {
//   // const game = gameNum === 1 ? testGame1 : testGame2;
//   const shipBoardId = gameNum === 1 ? "#p1-ship-board" : "#p2-ship-board";
//   const targetShipBoardId =
//     gameNum === 1 ? "#p2-target-ship-board" : "#p1-target-ship-board";

//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cellShipTarget = document.getElementById(
//         `T-SG${gameNum}: (${i},${j})`
//       );

//       // Check for sunk ships and update the color
//       ["A!", "B!", "D!", "S!", "C!"].forEach((shipCode, index) => {
//         if (board.ships[index].isSunk() && board[i][j] === shipCode) {
//           cellShipTarget.style.backgroundColor = "var(--text)";
//         }
//       });

//       // Check if all ships are sunk and update the board color
//       if (board.ships.every((ship) => ship.isSunk())) {
//         document.querySelector(shipBoardId).style.backgroundColor =
//           "var(--loser)";
//         document.querySelector(targetShipBoardId).style.backgroundColor =
//           "var(--loser)";
//       }
//     }
//   }
// }
