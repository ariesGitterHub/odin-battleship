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

// export function rotatePlaceShips1() {
//   const p1BtnRotate = document.querySelector("#p1-btn-rotate");
//   const p1X5Grid = document.querySelector("#p1-x5-grid");
//   const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");
//   let currentRotation = 0; // 0 = horizontal axis
//   let rotationCount = 0;
//   p1BtnRotate.addEventListener("click", () => {
//     rotationCount += 1;
//     if (rotationCount % 2 !== 0) {
//       currentRotation = 90;
//       allP1PlaceShips.forEach((axis) => {
//         axis.dataset.axis = "v";
//       });
//     } else {
//       currentRotation = 0;
//       allP1PlaceShips.forEach((axis) => {
//         axis.dataset.axis = "h";
//       });
//     }

//     p1X5Grid.style.transform = `rotate(${currentRotation}deg`;
//   });
// }
// rotatePlaceShips1();

// export function rotatePlaceShips2() {
//   const p2BtnRotate = document.querySelector("#p2-btn-rotate");
//   const p2X5Grid = document.querySelector("#p2-x5-grid");
//   const placeShipClass = document.querySelectorAll(".place-ship");
//   let currentRotation = 0; // 0 = horizontal axis
//   let rotationCount = 0;
//   p2BtnRotate.addEventListener("click", () => {
//     rotationCount += 1;
//     if (rotationCount % 2 !== 0) {
//       currentRotation = 90;
//       placeShipClass.forEach((axis) => {
//         axis.dataset.axis = "v";
//       });
//     } else {
//       currentRotation = 0;
//       placeShipClass.forEach((axis) => {
//         axis.dataset.axis = "h";
//       });
//     }

//     p2X5Grid.style.transform = `rotate(${currentRotation}deg`;
//   });
// }
// rotatePlaceShips2();

export function rotatePlaceShips(boardNum) {
  const btnRotateId = document.querySelector(`#p${boardNum}-btn-rotate`);
  const x5GridId = document.querySelector(`#p${boardNum}-x5-grid`);
  const allPlaceShipsClass = document.querySelectorAll(
    `.all-p${boardNum}-place-ships`
  );

  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  btnRotateId.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      allPlaceShipsClass.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      allPlaceShipsClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }

    x5GridId.style.transform = `rotate(${currentRotation}deg`;
  });
}

// function highlightPlaceShips1() {
//   const shipA1 = document.querySelector("#place-a1");
//   const shipB1 = document.querySelector("#place-b1");
//   const shipD1 = document.querySelector("#place-d1");
//   const shipS1 = document.querySelector("#place-s1");
//   const shipC1 = document.querySelector("#place-c1");

//   const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");

//   allP1PlaceShips.forEach((ship) =>
//     ship.addEventListener("click", () => {
//       if (ship.src === bA && ship.dataset.selected === "") {
//         ship.src = hA;
//         ship.dataset.selected = "yes";
//         shipB1.src = bB;
//         shipB1.dataset.selected = "";
//         shipD1.src = bD;
//         shipD1.dataset.selected = "";
//         shipS1.src = bS;
//         shipS1.dataset.selected = "";
//         shipC1.src = bC;
//         shipC1.dataset.selected = "";
//       } else if (ship.src === hA && ship.dataset.selected === "yes") {
//         ship.src = bA;
//         ship.dataset.selected = "";
//         shipB1.src = bB;
//         shipD1.src = bD;
//         shipS1.src = bS;
//         shipC1.src = bC;
//       }

//       if (ship.src === bB && ship.dataset.selected === "") {
//         ship.src = hB;
//         ship.dataset.selected = "yes";
//         shipA1.src = bA;
//         shipA1.dataset.selected = "";
//         shipD1.src = bD;
//         shipD1.dataset.selected = "";
//         shipS1.src = bS;
//         shipS1.dataset.selected = "";
//         shipC1.src = bC;
//         shipC1.dataset.selected = "";
//       } else if (ship.src === hB && ship.dataset.selected === "yes") {
//         ship.src = bB;
//         ship.dataset.selected = "";
//         shipA1.src = bA;
//         shipD1.src = bD;
//         shipS1.src = bS;
//         shipC1.src = bC;
//       }

//       if (ship.src === bD && ship.dataset.selected === "") {
//         ship.src = hD;
//         ship.dataset.selected = "yes";
//         shipA1.src = bA;
//         shipA1.dataset.selected = "";
//         shipB1.src = bB;
//         shipB1.dataset.selected = "";
//         shipS1.src = bS;
//         shipS1.dataset.selected = "";
//         shipC1.src = bC;
//         shipC1.dataset.selected = "";
//       } else if (ship.src === hD && ship.dataset.selected === "yes") {
//         ship.src = bD;
//         ship.dataset.selected = "";
//         shipA1.src = bA;
//         shipB1.src = bB;
//         shipS1.src = bS;
//         shipC1.src = bC;
//       }

//       if (ship.src === bS && ship.dataset.selected === "") {
//         ship.src = hS;
//         ship.dataset.selected = "yes";
//         shipA1.src = bA;
//         shipA1.dataset.selected = "";
//         shipB1.src = bB;
//         shipB1.dataset.selected = "";
//         shipD1.src = bD;
//         shipD1.dataset.selected = "";
//         shipC1.src = bC;
//         shipC1.dataset.selected = "";
//       } else if (ship.src === hS && ship.dataset.selected === "yes") {
//         ship.src = bS;
//         ship.dataset.selected = "";
//         shipA1.src = bA;
//         shipB1.src = bB;
//         shipD1.src = bD;
//         shipC1.src = bC;
//       }

//       if (ship.src === bC && ship.dataset.selected === "") {
//         ship.src = hC;
//         ship.dataset.selected = "yes";
//         shipA1.src = bA;
//         shipA1.dataset.selected = "";
//         shipB1.src = bB;
//         shipB1.dataset.selected = "";
//         shipD1.src = bD;
//         shipD1.dataset.selected = "";
//         shipS1.src = bS;
//         shipS1.dataset.selected = "";
//       } else if (ship.src === hC && ship.dataset.selected === "yes") {
//         ship.src = bC;
//         ship.dataset.selected = "";
//         shipA1.src = bA;
//         shipB1.src = bB;
//         shipD1.src = bD;
//         shipS1.src = bS;
//       }
//     })
//   );
// }
// highlightPlaceShips1();

// function highlightPlaceShips2() {
//   const shipA2 = document.querySelector("#place-a2");
//   const shipB2 = document.querySelector("#place-b2");
//   const shipD2 = document.querySelector("#place-d2");
//   const shipS2 = document.querySelector("#place-s2");
//   const shipC2 = document.querySelector("#place-c2");

//   const allP2PlaceShips = document.querySelectorAll(".all-p2-place-ships");

//   allP2PlaceShips.forEach((ship) =>
//     ship.addEventListener("click", () => {
//       // Change if statements to a switch...later
//       if (ship.src === bA && ship.dataset.selected === "") {
//         // ship.style.scale = "2"
//         ship.src = hA;
//         ship.dataset.selected = "yes";
//         shipB2.src = bB;
//         shipB2.dataset.selected = "";
//         shipD2.src = bD;
//         shipD2.dataset.selected = "";
//         shipS2.src = bS;
//         shipS2.dataset.selected = "";
//         shipC2.src = bC;
//         shipC2.dataset.selected = "";
//       } else if (ship.src === hA && ship.dataset.selected === "yes") {
//         ship.src = bA;
//         ship.dataset.selected = "";
//         shipB2.src = bB;
//         shipD2.src = bD;
//         shipS2.src = bS;
//         shipC2.src = bC;
//       }

//       if (ship.src === bB && ship.dataset.selected === "") {
//         ship.src = hB;
//         ship.dataset.selected = "yes";
//         shipA2.src = bA;
//         shipA2.dataset.selected = "";
//         shipD2.src = bD;
//         shipD2.dataset.selected = "";
//         shipS2.src = bS;
//         shipS2.dataset.selected = "";
//         shipC2.src = bC;
//         shipC2.dataset.selected = "";
//       } else if (ship.src === hB && ship.dataset.selected === "yes") {
//         ship.src = bB;
//         ship.dataset.selected = "";
//         shipA2.src = bA;
//         shipD2.src = bD;
//         shipS2.src = bS;
//         shipC2.src = bC;
//       }

//       if (ship.src === bD && ship.dataset.selected === "") {
//         ship.src = hD;
//         ship.dataset.selected = "yes";
//         shipA2.src = bA;
//         shipA2.dataset.selected = "";
//         shipB2.src = bB;
//         shipB2.dataset.selected = "";
//         shipS2.src = bS;
//         shipS2.dataset.selected = "";
//         shipC2.src = bC;
//         shipC2.dataset.selected = "";
//       } else if (ship.src === hD && ship.dataset.selected === "yes") {
//         ship.src = bD;
//         ship.dataset.selected = "";
//         shipA2.src = bA;
//         shipB2.src = bB;
//         shipS2.src = bS;
//         shipC2.src = bC;
//       }

//       if (ship.src === bS && ship.dataset.selected === "") {
//         ship.src = hS;
//         ship.dataset.selected = "yes";
//         shipA2.src = bA;
//         shipA2.dataset.selected = "";
//         shipB2.src = bB;
//         shipB2.dataset.selected = "";
//         shipD2.src = bD;
//         shipD2.dataset.selected = "";
//         shipC2.src = bC;
//         shipC2.dataset.selected = "";
//       } else if (ship.src === hS && ship.dataset.selected === "yes") {
//         ship.src = bS;
//         ship.dataset.selected = "";
//         shipA2.src = bA;
//         shipB2.src = bB;
//         shipD2.src = bD;
//         shipC2.src = bC;
//       }

//       if (ship.src === bC && ship.dataset.selected === "") {
//         ship.src = hC;
//         ship.dataset.selected = "yes";
//         shipA2.src = bA;
//         shipA2.dataset.selected = "";
//         shipB2.src = bB;
//         shipB2.dataset.selected = "";
//         shipD2.src = bD;
//         shipD2.dataset.selected = "";
//         shipS2.src = bS;
//         shipS2.dataset.selected = "";
//       } else if (ship.src === hC && ship.dataset.selected === "yes") {
//         ship.src = bC;
//         ship.dataset.selected = "";
//         shipA2.src = bA;
//         shipB2.src = bB;
//         shipD2.src = bD;
//         shipS2.src = bS;
//       }
//     })
//   );
// }
// highlightPlaceShips2();

// export function highlightPlaceShips(boardNum) {
//   const shipA = document.querySelector(`#place-a${boardNum}`);
//   const shipB = document.querySelector(`#place-b${boardNum}`);
//   const shipD = document.querySelector(`#place-d${boardNum}`);
//   const shipS = document.querySelector(`#place-s${boardNum}`);
//   const shipC = document.querySelector(`#place-c${boardNum}`);

//   const allPlaceShipsClass = document.querySelectorAll(
//     `.all-p${boardNum}-place-ships`
//   );

//   // const highlightShipImg = { "a": hA, "b": hB, "d": hD, "s": hS, "c": hC };
//   // const blackShipImg = { 'a': bA, "b": bB, "d": bD, "s": bS, "c": bC };
//   // let otherShips = ["a", "b", "d", "s", "c"]
//   // const otherShipIds = { "a": shipA, "b": shipB, "d": shipD, "s": shipS, "c": shipC };

//   const shipData = {
//     a: { id: shipA, blackImg: bA, highlightImg: hA },
//     b: { id: shipB, blackImg: bB, highlightImg: hB },
//     d: { id: shipD, blackImg: bD, highlightImg: hD },
//     s: { id: shipS, blackImg: bS, highlightImg: hS },
//     c: { id: shipC, blackImg: bC, highlightImg: hC },
//   };

//   // const shipData = {
//   //   a: { blackImg: bA, highlightImg: hA },
//   //   b: { blackImg: bB, highlightImg: hB },
//   //   d: { blackImg: bD, highlightImg: hD },
//   //   s: { blackImg: bS, highlightImg: hS },
//   //   c: { blackImg: bC, highlightImg: hC },
//   // };

//   allPlaceShipsClass.forEach((ship) =>
//     ship.addEventListener("click", () => {
//       const shipKey = ship.dataset.ship; // This will be 'a', 'b', etc.
//       const shipId = shipData[shipKey].id;
//       // Get all the keys from shipData
//       const allShipKeys = Object.keys(shipData);

//       // Filter out the current shipKey
//       const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

//       // Access the black and highlight images using the shipKey
//       // const shipId = shipData[shipKey].id; // Not needed
//       const blackImg = shipData[shipKey].blackImg;
//       const highlightImg = shipData[shipKey].highlightImg;

//       if (ship.src === blackImg && ship.dataset.selected === "") {
//         ship.src = highlightImg;
//         ship.dataset.selected = "yes";

//         otherShipKeys.forEach((key) => {
//           // Example action: Reset each ship's selected state and image
//           const otherShip = shipData[key]; // Access the ship object using the key
//           // Perform actions on otherShip, e.g., reset the image or the selected state
//           console.log(`Resetting ship: ${key}`, otherShip);

//           // For example, reset the image to the black image and unselect the ship:
//           const shipElement = document.querySelector(`[data-ship="${key}"]`);
//           shipElement.src = otherShip.blackImg; // Reset to black image
//           shipElement.dataset.selected = ""; // Unselect the ship
//         });
//       }

//       // else if (ship.src === highlightShipImg[ship.dataset.ship] && ship.dataset.selected === "yes") {
//       //   ship.src = bA;
//       //   ship.dataset.selected = "";
//       //   // shipB.src = bB;
//       //   // shipD.src = bD;
//       //   // shipS.src = bS;
//       //   // shipC.src = bC;
//       // }
//       else if (ship.src === highlightImg && ship.dataset.selected === "yes") {
//         ship.src = blackImg;
//         ship.dataset.selected = "";

//         otherShipKeys.forEach((key) => {
//           // Example action: Reset each ship's selected state and image
//           const otherShip = shipData[key]; // Access the ship object using the key
//           // Perform actions on otherShip, e.g., reset the image or the selected state
//           console.log(`Resetting ship: ${key}`, otherShip);

//           // For example, reset the image to the black image and unselect the ship:
//           const shipElement = document.querySelector(`[data-ship="${key}"]`);
//           shipElement.src = otherShip.blackImg; // Reset to black image
//           shipElement.dataset.selected = ""; // Unselect the ship
//         });
//       }

//       // if (ship.src === bB && ship.dataset.selected === "") {
//       //   ship.src = hB;
//       //   ship.dataset.selected = "yes";
//       //   shipA.src = bA;
//       //   shipA.dataset.selected = "";
//       //   shipD.src = bD;
//       //   shipD.dataset.selected = "";
//       //   shipS.src = bS;
//       //   shipS.dataset.selected = "";
//       //   shipC.src = bC;
//       //   shipC.dataset.selected = "";
//       // } else if (ship.src === hB && ship.dataset.selected === "yes") {
//       //   ship.src = bB;
//       //   ship.dataset.selected = "";
//       //   shipA.src = bA;
//       //   shipD.src = bD;
//       //   shipS.src = bS;
//       //   shipC.src = bC;
//       // }

//       // if (ship.src === bD && ship.dataset.selected === "") {
//       //   ship.src = hD;
//       //   ship.dataset.selected = "yes";
//       //   shipA.src = bA;
//       //   shipA.dataset.selected = "";
//       //   shipB.src = bB;
//       //   shipB.dataset.selected = "";
//       //   shipS.src = bS;
//       //   shipS.dataset.selected = "";
//       //   shipC.src = bC;
//       //   shipC.dataset.selected = "";
//       // } else if (ship.src === hD && ship.dataset.selected === "yes") {
//       //   ship.src = bD;
//       //   ship.dataset.selected = "";
//       //   shipA.src = bA;
//       //   shipB.src = bB;
//       //   shipS.src = bS;
//       //   shipC.src = bC;
//       // }

//       // if (ship.src === bS && ship.dataset.selected === "") {
//       //   ship.src = hS;
//       //   ship.dataset.selected = "yes";
//       //   shipA.src = bA;
//       //   shipA.dataset.selected = "";
//       //   shipB.src = bB;
//       //   shipB.dataset.selected = "";
//       //   shipD.src = bD;
//       //   shipD.dataset.selected = "";
//       //   shipC.src = bC;
//       //   shipC.dataset.selected = "";
//       // } else if (ship.src === hS && ship.dataset.selected === "yes") {
//       //   ship.src = bS;
//       //   ship.dataset.selected = "";
//       //   shipA.src = bA;
//       //   shipB.src = bB;
//       //   shipD.src = bD;
//       //   shipC.src = bC;
//       // }

//       // if (ship.src === bC && ship.dataset.selected === "") {
//       //   ship.src = hC;
//       //   ship.dataset.selected = "yes";
//       //   shipA.src = bA;
//       //   shipA.dataset.selected = "";
//       //   shipB.src = bB;
//       //   shipB.dataset.selected = "";
//       //   shipD.src = bD;
//       //   shipD.dataset.selected = "";
//       //   shipS.src = bS;
//       //   shipS.dataset.selected = "";
//       // } else if (ship.src === hC && ship.dataset.selected === "yes") {
//       //   ship.src = bC;
//       //   ship.dataset.selected = "";
//       //   shipA.src = bA;
//       //   shipB.src = bB;
//       //   shipD.src = bD;
//       //   shipS.src = bS;
//       // }
//     })
//   );
// }

export function highlightPlaceShips(boardNum) {
  // Ship elements are now using the boardNum to differentiate between boards
  // const shipA = document.querySelector(`#place-a${boardNum}`);
  // const shipB = document.querySelector(`#place-b${boardNum}`);
  // const shipD = document.querySelector(`#place-d${boardNum}`);
  // const shipS = document.querySelector(`#place-s${boardNum}`);
  // const shipC = document.querySelector(`#place-c${boardNum}`);

  const allPlaceShipsClass = document.querySelectorAll(
    `.all-p${boardNum}-place-ships`
  );

  // Define the ship data (with image references) for the current board
  // const shipData = {
  //   a: { id: shipA, blackImg: bA, highlightImg: hA },
  //   b: { id: shipB, blackImg: bB, highlightImg: hB },
  //   d: { id: shipD, blackImg: bD, highlightImg: hD },
  //   s: { id: shipS, blackImg: bS, highlightImg: hS },
  //   c: { id: shipC, blackImg: bC, highlightImg: hC },
  // };
  const shipData = {
    a: { blackImg: bA, highlightImg: hA },
    b: { blackImg: bB, highlightImg: hB },
    d: { blackImg: bD, highlightImg: hD },
    s: { blackImg: bS, highlightImg: hS },
    c: { blackImg: bC, highlightImg: hC },
  };

  allPlaceShipsClass.forEach((ship) =>
    ship.addEventListener("click", () => {
      const shipKey = ship.dataset.ship;
      // const shipId = shipData[shipKey].id;

      // This hits ALL ship keys for the current board
      const allShipKeys = Object.keys(shipData);
      const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

      // Black and highlight images
      const blackImg = shipData[shipKey].blackImg;
      const highlightImg = shipData[shipKey].highlightImg;

      // If the ship is not highlighted, highlight it, then reset others for this board
      if (ship.src === blackImg && ship.dataset.selected === "") {
        ship.src = highlightImg;
        ship.dataset.selected = "yes";
        // ship.classList.add("draggable");

        // Reset all other ships for this board to black images and unselect
        otherShipKeys.forEach((key) => {
          const otherShip = shipData[key];
          const shipElement = document.querySelector(
            `#place-${key}${boardNum}`
          );
          shipElement.src = otherShip.blackImg; // Reset to black image
          shipElement.dataset.selected = ""; // Unselect
          // shipElement.classList.remove("draggable");
        });
      }
      // If this ship is already highlighted, unhighlight it and reset others for this board
      else if (ship.src === highlightImg && ship.dataset.selected === "yes") {
        ship.src = blackImg;
        ship.dataset.selected = "";
        // ship.classList.remove("draggable");

        // Reset all other ships for this board to black images and unselect
        otherShipKeys.forEach((key) => {
          const otherShip = shipData[key];
          // Below was the final change needed to get both boards working
          const shipElement = document.querySelector(
            `#place-${key}${boardNum}`
          );
          shipElement.src = otherShip.blackImg; // Reset to black image
          shipElement.dataset.selected = ""; // Unselect
        });
      }
    })
  );
}

// export function attackTargetCoordinates(boardNum) {
//     const hitMissTargetCells = document.querySelectorAll(
//       `.hit-miss-target-cells${boardNum}`
//     );
//     // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
//     highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
//     hitMissTargetCells.forEach((cell) => {
//       cell.addEventListener("click", () => {
//         let targetId = cell.id;
//         let regex = /\((\d+),(\d+)\)/;
//         let matches = targetId.match(regex);
//         let row, col;

//         if (matches) {
//           row = +matches[1]; // Reminder, this converts the string to a number
//           col = +matches[2]; // Same as above
//           console.log(`Coordinates clicked: ${row}, ${col}`);
//           console.log(typeof row === "number");
//           console.log(testGame1.receiveAttack(row, col));
//           addEmojiEffect(player1.playerBoard.board, 1);
//           colorSunkShips(testGame1, 1);
//           // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
//           highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
//         }
//       });
//     });
//   }

// export function getRowAndColNums(boardNum) {
//   const hitMissTargetCells = document.querySelectorAll(
//     `.hit-miss-target-cells${boardNum}`
//   );

//   // Ensure the cells exist
//   if (!hitMissTargetCells.length) {
//     console.error(`No target cells found for board number: ${boardNum}`);
//     return;
//   }

//   hitMissTargetCells.forEach((cell) => {
//     cell.addEventListener("click", () => {
//       let targetId = cell.id;
//       let regex = /\((\d+),(\d+)\)/;
//       let matches = targetId.match(regex);
//       let row, col;

//       if (matches) {
//         row = +matches[1]; // Reminder, this converts the string to a number
//         col = +matches[2]; // Same as above
//       }
//     });
//   });
//   return {
//     row,
//     col
//   }
// }



// export function getRowAndColNums(boardNum) {
//   return new Promise((resolve, reject) => {
//     const hitMissTargetCells = document.querySelectorAll(
//       `.hit-miss-target-cells${boardNum}`
//     );

//     // Ensure the cells exist
//     if (!hitMissTargetCells.length) {
//       console.error(`No target cells found for board number: ${boardNum}`);
//       reject(new Error("No target cells found"));
//       return;
//     }

//     hitMissTargetCells.forEach((cell) => {
//       cell.addEventListener("click", () => {
//         let targetId = cell.id;
//         let regex = /\((\d+),(\d+)\)/;
//         let matches = targetId.match(regex);
//         let row, col;

//         if (matches) {
//           row = +matches[1]; // Converts string to number
//           col = +matches[2]; // Converts string to number
//           resolve({ row, col }); // Resolve the promise with the row and col
//         }
//       });
//     });
//   });
// }
