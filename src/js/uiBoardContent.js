import { createElement } from "./basicFunctions.js";
import { imgMaker } from "./uiImages.js";
// import { createImg } from "./basicFunctions.js";
// // import shipA5hPNG from "../assets/a5h.png";
// import ship1P from "../assets/ship1P.svg";
// import ship2C from "../assets/ship2C.svg";
// import ship3D from "../assets/ship3D.svg";
// import ship3S from "../assets/ship3S.svg";
// import ship4B from "../assets/ship4B.svg";
// import ship5A from "../assets/ship5A.svg";
// import hit1 from "../assets/hit1.svg";
// import hit2 from "../assets/hit2.svg";
// import hit3 from "../assets/hit3.svg";
// import miss1 from "../assets/miss1.svg";
// import miss2 from "../assets/miss2.svg";
// import miss3 from "../assets/miss3.svg";
import { createHitMissGrid1, createHitMissGrid2 } from "./uiHitMissGrid.js";
import { createShipGrid1, createShipGrid2 } from "./uiShipGrid.js";

export function createContainers() {
  // This is where the two player containers and board container are created; use this to alter the order of elements between mobile and large screen viewports.
  const gameContent = document.querySelector("#game-content");
  // gameContent.classList.add("flex-row");
  const boardContainer = createElement(
    "div",
    {
      id: "board-container",
      // class: "flex-row",
    }
    // "Game Content follows..."
  );

  const p1FullBoard = createElement(
    "div",
    {
      id: "p1-full-board",
      // class: "flex-row",
    },
    "Player One"
  );

  const p2FullBoard = createElement(
    "div",
    {
      id: "p2-full-board",
      // class: "flex-row",
    },
    "Player Two"
  );
  const p1ShipBoard = createElement(
    "div",
    {
      id: "p1-ship-board",
      // class: "flex-row",
    }
    // "Game Content follows..."
  );

  const p2ShipBoard = createElement(
    "div",
    {
      id: "p2-ship-board",
      // class: "flex-row",
    }
    // "Game Content follows..."
  );

  const p1StatusBoard = createElement(
    "div",
    {
      id: "p1-status-board",
      // class: "flex-row",
    }
    // "Game Content follows..."
  );

  const p2StatusBoard = createElement(
    "div",
    {
      id: "p2-status-board",
      // class: "flex-row",
    }
    // "Game Content follows..."
  );


  gameContent.appendChild(boardContainer);
  boardContainer.append(p1FullBoard, p2FullBoard);
  p1FullBoard.append(p1ShipBoard, p1StatusBoard);
  p2FullBoard.append(p2ShipBoard, p2StatusBoard)

}

// function addEmojiEffect(i, j, board) { // This function is activated automatically in createGrid();
//   // If the target is a hit, render an explosion emoji
//   if (
//     board[i][j] === "A!" ||
//     board[i][j] === "B!" ||
//     board[i][j] === "D!" ||
//     board[i][j] === "S!" ||
//     board[i][j] === "C!" ||
//     board[i][j] === "P!"
//   ) {
//     return "💥";
//   }
//   // If the target is a miss, render a white dot emoji
//   else if (board[i][j] === "mm") {
//     return "⚪";
//   } else {
//     return "  ";
//   }
// }

// function createGrid(board) {
//   // let rows = 10;
//   // let cols = 10;
//   let grid = [];
//   // for (let i = 0; i < rows; i++) {
//   for (let i = 0; i < board.length; i++) {
//     // for (let j = 0; j < cols; j++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement(
//         "div",
//         {
//           id: `${i},${j}`,
//           class: "board-cell",
//         },
//         // `${board[i][j]}`

//         // `${addShipColor(i, j, board)}` ||
//         `${addEmojiEffect(i, j, board)}`
//       );
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// function createGrid1(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement(
//         "div",
//         {
//           id: `P1: (${i},${j})`,
//           class: "board-cell1",
//         }
//         // `${addEmojiEffect(i, j, board)}`
//       );
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// function createGrid2(board) {
//   let grid = [];
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       const gridCell = createElement(
//         "div",
//         {
//           id: `P2: (${i},${j})`,
//           class: "board-cell2",
//         }
//         // `${addEmojiEffect(i, j, board)}`
//       );
//       grid.push(gridCell);
//     }
//   }
//   return grid;
// }

// export function createGameContent(board) {
//   const p1Board = document.querySelector("#p1-board");
//   const p2Board = document.querySelector("#p2-board");

//   const gridCells1 = createGrid1(board);
//   gridCells1.forEach((cell) => {
//     p1Board.appendChild(cell);
//   });
//   const gridCells2 = createGrid2(board);
//   gridCells2.forEach((cell) => {
//     p2Board.appendChild(cell);
//   });
// }

export function createGameContent(board) {
  const p1ShipBoard = document.querySelector("#p1-ship-board");
  const p2ShipBoard = document.querySelector("#p2-ship-board");
  const p1StatusBoard = document.querySelector("#p1-status-board");
  const p2StatusBoard = document.querySelector("#p2-status-board");

  const shipGridCells1 = createShipGrid1(board);
  shipGridCells1.forEach((cell) => {
    p1ShipBoard.appendChild(cell);
  });
  const shipGridCells2 = createShipGrid2(board);
  shipGridCells2.forEach((cell) => {
    p2ShipBoard.appendChild(cell);
  });

  const hitMissGridCells1 = createHitMissGrid1(board);
  hitMissGridCells1.forEach((cell) => {
    p1StatusBoard.appendChild(cell);
  });

  const hitMissGridCells2 = createHitMissGrid2(board);
  hitMissGridCells2.forEach((cell) => {
    p2StatusBoard.appendChild(cell);
  });
}

// export function addShipColor1(board) {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cell = document.getElementById(`P1: (${i},${j})`);
//       if (board[i][j] === "a" || board[i][j] === "A!") {
//         cell.style.backgroundColor = "var(--pur)";
//       }
//       if (board[i][j] === "b" || board[i][j] === "B!") {
//         cell.style.backgroundColor = "var(--blu)";
//       }
//       if (board[i][j] === "d" || board[i][j] === "D!") {
//         cell.style.backgroundColor = "var(--grn)";
//       }
//       if (board[i][j] === "s" || board[i][j] === "S!") {
//         cell.style.backgroundColor = "var(--yel)";
//       }
//       if (board[i][j] === "c" || board[i][j] === "C!") {
//         cell.style.backgroundColor = "var(--org)";
//       }
//       // if (board[i][j] === "p" || board[i][j] === "P!") {
//       //   cell.style.backgroundColor = "var(--red)";
//       // }
//     }
//   }
// }

// export function addShipColor2(board) {
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cell = document.getElementById(`P2: (${i},${j})`);
//       if (board[i][j] === "a" || board[i][j] === "A!") {
//         cell.style.backgroundColor = "var(--pur)";
//       }
//       if (board[i][j] === "b" || board[i][j] === "B!") {
//         cell.style.backgroundColor = "var(--blu)";
//       }
//       if (board[i][j] === "d" || board[i][j] === "D!") {
//         cell.style.backgroundColor = "var(--grn)";
//       }
//       if (board[i][j] === "s" || board[i][j] === "S!") {
//         cell.style.backgroundColor = "var(--yel)";
//       }
//       if (board[i][j] === "c" || board[i][j] === "C!") {
//         cell.style.backgroundColor = "var(--org)";
//       }
//       // if (board[i][j] === "p" || board[i][j] === "P!") {
//       //   cell.style.backgroundColor = "var(--red)";
//       // }
//     }
//   }
// }
// export function randomRotate() {
//   const angle = Math.random() * 360; // Generate a random angle between 0 and 360
//   const textElement = document.querySelectorAll(".hit");
//   textElement.style.transform = `rotate(${angle}deg)`;
// }

// // Call the function to rotate text randomly

// // Optionally, call the function at intervals to rotate text periodically
// setInterval(randomRotate, 20000); // Rotate every 2 seconds

// export function addEmojiEffect1(board) {
//   // This function is activated automatically in createGrid();
//   // If the target is a hit, render an explosion emoji
//   const boom = imgMaker("", "h3", "");
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cell = document.getElementById(`P1: (${i},${j})`);
//       if (
//         board[i][j] === "A!" ||
//         board[i][j] === "B!" ||
//         board[i][j] === "D!" ||
//         board[i][j] === "S!" ||
//         board[i][j] === "C!" // ||
//         // board[i][j] === "P!"
//       ) {
//         cell.innerText = "💥";
//         // cell.forEach(cell => {
//         //   cell.append(boom)
//         // })

//     }
//       // If the target is a miss, render a white dot emoji
//       else if (board[i][j] === "mm") {
//         cell.innerText = "⚪";
//       } else {
//         cell.innerText = "  ";
//       }
//     }
//   }
// }

// export function addEmojiEffect2(board) {
//   // This function is activated automatically in createGrid();
//   // If the target is a hit, render an explosion emoji
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[i].length; j++) {
//       let cell = document.getElementById(`P2: (${i},${j})`);
//       if (
//         board[i][j] === "A!" ||
//         board[i][j] === "B!" ||
//         board[i][j] === "D!" ||
//         board[i][j] === "S!" ||
//         board[i][j] === "C!" // ||
//         // board[i][j] === "P!"
//       ) {
//         cell.innerText = "💥";
//       }
//       // If the target is a miss, render a white dot emoji
//       else if (board[i][j] === "mm") {
//         cell.innerText = "⚪";
//       } else {
//         cell.innerText = "  ";
//       }
//     }
//   }
// }

// Need a function that updates the UI with...
// adds the miss class to "mm" so that the emoji font size is smaller
// same for the explosion emoji size by adding hit class to "!!"
// hit and miss imgs come in 5 forms and should be displayed randomly...this needs a function too
// also rechecks the sunk status after each hit or miss
// changes the cell color to sunk red if sunk

// Need a function that handles adding cut up ship parts to cells that in the proper "v" or "h" orientation.
