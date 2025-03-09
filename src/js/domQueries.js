export function getHeaderElements() {
  return {
    header: document.querySelector("#header"),
    titleContainer: document.querySelector("#title-container"),
    titleTextTop: document.querySelector("#title-text-top"),
    titleTextBot: document.querySelector("#title-text-bot"),
    MMM: document.querySelector("#MMM"),
    gifContainer: document.querySelector("#gif-container"),
    battleshipGif: document.querySelector("#battleship-gif"),
  };
}

export function getMessageElements() {
  return {
    messages: document.querySelector("#messages"),
    messageBar: document.querySelector("#message-bar"),
  };
}

export function getBtnElements(boardNum) {
  return {
    mainBtnContainer: document.querySelector("#main-btn-container"),
    btnPvsC: document.querySelector("#btn-pvsc"),
    btnPvsP: document.querySelector("#btn-pvsp"),
    btnQuitGame: document.querySelector("#btn-quit-game"),
    btnStartGame: document.querySelector("#btn-start-game"),
    btnHideScreen: document.querySelector("#btn-hide-screen"),
    btnUnlockScreen: document.querySelector("#btn-unlock-screen"),
    btnRotate: document.querySelector(`#p${boardNum}-btn-rotate`),

    // TODO - MOVE THESE TWO to getBoardElements
    // x5Grid: document.querySelector(`#p${boardNum}-x5-grid`),
    // allPlaceShipsClass: document.querySelectorAll(`.all-p${boardNum}-place-ships`),

    btnUndo: document.querySelector(`#p${boardNum}-btn-undo`),
    btnClear: document.querySelector(`#p${boardNum}-btn-clear`),
    p2BtnRandom: document.querySelector("#p2-btn-random"),
    btnRandom: document.querySelector(`#p${boardNum}-btn-random`),
    // const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
  };
}
 // TODO - ORGANIZE THIS!!!!
export function getBoardElements(boardNum) {
  return {
    body: document.querySelector("body"),
    boardContainer: document.querySelector("#board-container"),
    p1FullBoard: document.querySelector("#p1-full-board"),
    p2FullBoard: document.querySelector("#p2-full-board"),
    // TODO - keep this below? or delete and just reference the full boards themselves
    flipFullBoard: document.querySelector(".flip-full-board"),

    p1PlaceShips: document.querySelector("#p1-place-ships"),
    p2PlaceShips: document.querySelector("#p2-place-ships"),

    p1DeploymentZone: document.querySelector("#p1-deployment-zone"),
    p2DeploymentZone: document.querySelector("#p2-deployment-zone"),

    p1TargetZone: document.querySelector("#p1-target-zone"),
    p2TargetZone: document.querySelector("#p2-target-zone"),

    p1ShipBoard: document.querySelector("#p1-ship-board"),
    p1BtnContainer: document.querySelector("#p1-place-ship-btn-container"),
    p1HitMissBoard: document.querySelector("#p1-hit-miss-board"),
    p1TargetShipBoard: document.querySelector("#p1-target-ship-board"),
    p1TargetHitMissBoard: document.querySelector("#p1-target-hit-miss-board"),

    p2ShipBoard: document.querySelector("#p2-ship-board"),
    p2BtnContainer: document.querySelector("#p2-place-ship-btn-container"),
    p2HitMissBoard: document.querySelector("#p2-hit-miss-board"),
    p2TargetShipBoard: document.querySelector("#p2-target-ship-board"),
    p2TargetHitMissBoard: document.querySelector("#p2-target-hit-miss-board"),

    ships: document.querySelectorAll(".ship"),

    shipCellsClass: document.querySelectorAll(`.ship-cells${boardNum}`),
    hitMissCellsClass: document.querySelectorAll(`.hit-miss-cells${boardNum}`),
    hitMissTargetCellsClass: document.querySelectorAll(
      `.hit-miss-target-cells${boardNum}`
    ),

    allPlaceShipsClass: document.querySelectorAll(`.all-p${boardNum}-place-ships`),
    x5Grid: document.querySelector(`#p${boardNum}-x5-grid`),

    placeA: document.querySelector(`#place-a${boardNum}`),
    placeB: document.querySelector(`#place-b${boardNum}`),
    placeD: document.querySelector(`#place-d${boardNum}`),
    placeS: document.querySelector(`#place-s${boardNum}`),
    placeC: document.querySelector(`#place-c${boardNum}`),

    shipA: document.querySelector(`#ship-a${boardNum}`),
    shipB: document.querySelector(`#ship-b${boardNum}`),
    shipD: document.querySelector(`#ship-d${boardNum}`),
    shipS: document.querySelector(`#ship-s${boardNum}`),
    shipC: document.querySelector(`#ship-c${boardNum}`),
    // shipA1: document.querySelector(`#ship-a1`),
  };
}


  // function takeTurnsPvsC() {
  //   const { player1Attack, player2ComputerAttack } = handleMessageContent();
  //   if (player2.playerType === "machine") {
  //     // console.log(player2.playerType);
  //     if (playerTurn > 0 && playerTurn % 2 === 0) {
  //       // clearMessage();
  //       // addMessage(player1Attack);
  //     }
  //     if (playerTurn > 0 && playerTurn % 2 !== 0) {
  //       clearMessage();

  //       let { randomRow, randomCol } = getUniqueRandomCoordinates();
  //       let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       // setTimeout(() => {
  //       // hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       // }, 500);
  //       addMessage(
  //         `${player2ComputerAttack} and it is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}).`
  //       );
  //       // console.log(
  //       //   `Last attack by P2 was a ${hitOrMiss} at (${randomRow}, ${randomCol})`
  //       // );

  //       //console.log(testGame1.receiveAttack(randomRow, randomCol));
  //       // console.log(`Turn before P2 = ${playerTurn}`);
  //       playerTurn += 1;
  //       // console.log(`Turn after P2 = ${playerTurn}`);
  //       mp3Fire();
  //       // console.log(randomRow, randomCol);
  //       // START HERE ON THURSDAY...

  //       // testGame1.receiveAttack(randomRow, randomCol);
  //       addEmojiEffect(player1.playerBoard.board, 1);
  //       colorSunkShips(testGame1, 1);
  //       highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //       // console.table(player1.playerBoard.board);
  //     }
  //   }
  // }

  //   function manageTurns(boardNum) {
  //     const { player2ComputerAttack } = handleMessageContent();
  //     if (player2.playerType === "machine" && playerTurn === 0) {
  //       clearMessage();
  //             addMessage(
  //               `${player2ComputerAttack} and it is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}).`
  //             );
  //       manuallyAttackTargetCoordinates(boardNum);
  //       // console.log(`p1 turn = ${playerTurn}`);
  //     }
  //     if (player2.playerType === "machine" && playerTurn > 0 && playerTurn % 2 !== 0) {
  //       clearMessage();
  //       let { randomRow, randomCol } = getUniqueRandomCoordinates();
  //       let hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  //       addMessage(
  //         `${player2ComputerAttack} and it is a ${hitOrMiss} at coordinates: (${randomRow}, ${randomCol}).`
  //       );
  //       playerTurn += 1;
  //       // console.log(`p2 turn = ${playerTurn}`);
  //       mp3Fire();
  //       addEmojiEffect(player1.playerBoard.board, 1);
  //       colorSunkShips(testGame1, 1);
  //       highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
  //     }
  //    console.log(`turn = ${playerTurn}`);
  //   }

  

// export function getRandomRow(min = 0, max = 9) {
//   const randomRow = Math.floor(Math.random() * (max - min + 1)) + min;
//   return randomRow;
// }

// export function getRandomCol(min = 0, max = 9) {
//   const randomCol = Math.floor(Math.random() * (max - min + 1)) + min;
//   return randomCol;
// }

// function everyOtherColDependingOnRow(row) {
//   const even = [0, 2, 4, 6, 8];
//   const odd = [1, 3, 5, 7, 9];
//   const randomIndex = Math.floor(Math.random() * even.length); // Generates a random index
//   const randomEvenNumber = even[randomIndex]; // Gets the random number from the array
//   const randomOddNumber = odd[randomIndex]; // Gets the random number from the array

//   let everyOtherColEven = randomEvenNumber;
//   let everyOtherColOdd = randomOddNumber;
//   if (row % 2 === 0) {
//     return everyOtherColEven;
//   } else if (row % 2 !== 0) {
//     return everyOtherColOdd;
//   }
// }

// export function getRandomAxis(min = 0, max = 9) {
//   const randomAxisNum = Math.floor(Math.random() * (max - min + 1)) + min;
//   let randomAxis;
//   if (randomAxisNum % 2 === 0) {
//     randomAxis = "v";
//   } else {
//     randomAxis = "h";
//   }
//   return randomAxis;
// }

// // export function getUniqueRandomCoordinates() {
// //   const noRepeatSet = new Set();
// //   let randomRow = getRandomRow;
// //   let randomCol = getRandomCol;
// //   let coordinates = [randomRow, randomCol]
// //     getUniqueRandomCoordinates();
// //   if (noRepeatSet.has(coordinates)) {

// //   } else {
// //     noRepeatSet.set(coordinates);
// //     return {
// //       randomRow,
// //       randomCol
// //     }
// //   }
// // }

// // TODO - REFACTOR!!! A mess
// const noRepeatSet = new Set(); // Put set outside of function so that it accumulate new coordinates and not refresh itself when called
// let randomRow, randomCol, coordinates;

// const priorHitsSet = new Set();
// const priorHitsArray = Array.from(priorHitsSet);
// // const lastHitTargetTheseCoordinates = priorHitsArray[priorHitsArray.length - 1];
// const hunterCoordinateSet = new Set();
// const hunterCoordinateArray = Array.from(hunterCoordinateSet);
// // function getRandomValueFromArray(array) {
// //   const randomIndex = Math.floor(Math.random() * array.length);
// //   return array[randomIndex];
// // }

// // const myArray = [-1, 1];
// // const randomValue = getRandomValueFromArray(myArray);

// // console.log(randomValue);

// // export function getUniqueRandomCoordinates() {
// //   // const noRepeatSet = new Set();

// //   // Repeat until we find unique coordinates
// //   // let randomRow, randomCol, coordinates;

// //   do {
// //     randomRow = getRandomRow();
// //     randomCol = getRandomCol();
// //     coordinates = `${randomRow},${randomCol}`; // Create a string representation for easy comparison
// //   } while (noRepeatSet.has(coordinates)); // Check if the coordinate has already been used

// //   // Store the unique coordinate
// //   noRepeatSet.add(coordinates);
// //   console.log(noRepeatSet);
// //   return {
// //     randomRow,
// //     randomCol,
// //   };
// // }

// // export function getUniqueEnhancedCoordinates(
// // export function getUniqueRandomCoordinates(
// //   lastPlayer2ComputerAttack,
// //   randomRowStored,
// //   randomColStored
// // ) {
// //   // const noRepeatSet = new Set();

// //   // Repeat until we find unique coordinates
// //   // let randomRow, randomCol, coordinates;

// //   if (lastPlayer2ComputerAttack === "HIT!!!") {
// //     let randomRow1 = randomRowStored + randomValue;
// //     randomCol = randomColStored;
// //     let coordinates1 = `${randomRow1},${randomCol}`;

// //     randomRow = randomRowStored;
// //     let randomCol2 = randomColStored + randomValue;
// //     let coordinates2 = `${randomRow},${randomCol2}`;

// //     if (randomRow1 >= 0 && randomRow1 < 10 && !noRepeatSet.has(coordinates1)) {
// //       randomRow = randomRow1;
// //       return {
// //         randomRow,
// //         randomCol,
// //       };
// //     } else if (
// //       randomCol2 >= 0 &&
// //       randomCol2 < 10 &&
// //       !noRepeatSet.has(coordinates2)
// //     ) {
// //       randomCol = randomCol2;
// //       return {
// //         randomRow,
// //         randomCol,
// //       };
// //     }
// //   } else if (lastPlayer2ComputerAttack !== "HIT!!!") {
// //       do {
// //         randomRow = getRandomRow();
// //         randomCol = getRandomCol();
// //         coordinates = `${randomRow},${randomCol}`; // Create a string representation for easy comparison
// //       } while (noRepeatSet.has(coordinates)); // Check if the coordinate has already been used
// //       // Store the unique coordinate
// //       noRepeatSet.add(coordinates);
// //       console.log(noRepeatSet);
// //       return {
// //         randomRow,
// //         randomCol,
// //       };
// //   }
// // }

// // This function ensures that all random coordinates are unique and that a player2Computer hit will snoop around with attacks on adjacent squares if its last attack was a hit.

// export function getUniqueRandomCoordinates(
//   lastPlayer2ComputerAttack,
//   randomRowStored,
//   randomColStored
//   // lastPlayer2ComputerPriorAttack,
//   // randomRowPriorStored,
//   // randomColPriorStored
// ) {
//   // let randomRow, randomCol, coordinates;

//   // Random value from [-1, 0, 1] to target neighboring cells
//   // const myArray = [-1, 0, 1];
//   // const randomValue = getRandomValueFromArray(myArray);

//   // If last attack was a hit, attempt to target nearby coordinates
//   if (lastPlayer2ComputerAttack === "HIT!!!") {
//     const lastHitCoordinates = `${randomRowStored},${randomColStored}`;
//     priorHitsSet.add(lastHitCoordinates);

//     console.log(lastHitCoordinates); // Output: "4,5"
//     console.log(priorHitsSet);

//     let adjacentCoordinates = [
//       `${randomRowStored + 1},${randomColStored}`, // Down
//       `${randomRowStored - 1},${randomColStored}`, // Up
//       `${randomRowStored},${randomColStored + 1}`, // Right
//       `${randomRowStored},${randomColStored - 1}`, // Left
//       // `${randomRowStored + 1},${randomColStored + 1}`, // Down-right (diagonal)
//       // `${randomRowStored - 1},${randomColStored - 1}`, // Up-left (diagonal)
//       // `${randomRowStored + 1},${randomColStored - 1}`, // Down-left (diagonal)
//       // `${randomRowStored - 1},${randomColStored + 1}`, // Up-right (diagonal)
//     ];

//     let attempts = 0;
//     let foundValidCoordinate = false;

//     // randomRowPriorStored = randomRowStored;
//     // randomColPriorStored = randomColStored;

//     // Try to find a valid adjacent coordinate that hasn't been used
//     while (attempts < 10 && !foundValidCoordinate) {
//       let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
//       coordinates = adjacentCoordinates[randomIndex];
//       [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col

//       // Check if the coordinates are valid (within bounds and not used before)
//       if (
//         randomRow >= 0 &&
//         randomRow < 10 && // Ensure it's within bounds
//         randomCol >= 0 &&
//         randomCol < 10 &&
//         !noRepeatSet.has(coordinates) // Ensure it's not a previously used coordinate
//       ) {
//         foundValidCoordinate = true; // A valid coordinate is found
//       } else {
//         attempts++; // Increase the number of attempts
//       }
//     }

//     // If no valid coordinate found after 10 attempts, default to a random one
//     if (!foundValidCoordinate) {
//       console.log(
//         "No valid adjacent coordinate found after 10 attempts, picking random coordinate."
//       );
//       do {
//         randomRow = getRandomRow();
//         randomCol = getRandomCol();
//         coordinates = `${randomRow},${randomCol}`;
//       } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//     }
//   } else if (
//     lastPlayer2ComputerAttack === "Double or nothing!!"
//     // || lastPlayer2ComputerAttack === "Triple or nothing!"
//   ) {
//     // Get the last hit coordinates from the set
//     const priorHitsArray = Array.from(priorHitsSet);
//     const lastHitTargetTheseCoordinates =
//       priorHitsArray[priorHitsArray.length - 1];
//     const [randomRowDoubleOrNothing, randomColDoubleOrNothing] =
//       lastHitTargetTheseCoordinates.split(",").map(Number); // Split and map to row and col

//     console.log(
//       `Prior coordinates: ${randomRowDoubleOrNothing},${randomColDoubleOrNothing}`
//     );

//     let adjacentCoordinates = [
//       `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing}`, // Down
//       `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing}`, // Up
//       `${randomRowDoubleOrNothing},${randomColDoubleOrNothing + 1}`, // Right
//       `${randomRowDoubleOrNothing},${randomColDoubleOrNothing - 1}`, // Left
//       // Uncomment these if you want to include diagonals
//       // `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing + 1}`, // Down-right (diagonal)
//       // `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing - 1}`, // Up-left (diagonal)
//       // `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing - 1}`, // Down-left (diagonal)
//       // `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing + 1}`, // Up-right (diagonal)
//     ];

//     let attempts = 0;
//     let foundValidCoordinate = false;

//     // Try to find a valid adjacent coordinate that hasn't been used
//     while (attempts < 10 && !foundValidCoordinate) {
//       let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
//       coordinates = adjacentCoordinates[randomIndex];
//       [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col

//       // Check if the coordinates are valid (within bounds and not used before)
//       if (
//         randomRow >= 0 &&
//         randomRow < 10 && // Ensure it's within bounds
//         randomCol >= 0 &&
//         randomCol < 10 &&
//         !noRepeatSet.has(coordinates) // Ensure it's not a previously used coordinate
//       ) {
//         foundValidCoordinate = true; // A valid coordinate is found
//       } else {
//         attempts++; // Increase the number of attempts
//       }
//     }

//     // If no valid coordinate found after 10 attempts, default to a random one
//     if (!foundValidCoordinate) {
//       console.log(
//         "No valid adjacent coordinate found after 10 attempts, picking random coordinate."
//       );
//       do {
//         randomRow = getRandomRow();
//         randomCol = getRandomCol();
//         coordinates = `${randomRow},${randomCol}`;
//       } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//     }
//   } else if (
//     lastPlayer2ComputerAttack === "miss" &&
//     hunterCoordinateArray.length > 20
//   ) {
//     do {
//       randomRow = getRandomRow();
//       randomCol = getRandomCol();
//       coordinates = `${randomRow},${randomCol}`;
//     } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//   } else {
//     do {
//       randomRow = getRandomRow();
//       randomCol = everyOtherColDependingOnRow(randomRow);
//       coordinates = `${randomRow},${randomCol}`;
//       hunterCoordinateSet.add(coordinates);
//       console.log(`every other ${coordinates}`);
//       console.log(hunterCoordinateArray);
//     } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//   }

//   // Add the unique coordinate to the set
//   noRepeatSet.add(coordinates);
//   console.log(noRepeatSet);
//   console.log(hunterCoordinateSet);

//   return {
//     randomRow,
//     randomCol,
//   };
// }

// SUNDAY...2/23/2025
export function getRandomRow(min = 0, max = 9) {
  const randomRow = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomRow;
}

export function getRandomCol(min = 0, max = 9) {
  const randomCol = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomCol;
}

export function getRandomAxis(min = 0, max = 9) {
  const randomAxisNum = Math.floor(Math.random() * (max - min + 1)) + min;
  let randomAxis;
  if (randomAxisNum % 2 === 0) {
    randomAxis = "v";
  } else {
    randomAxis = "h";
  }
  return randomAxis;
}

function everyOtherColDependingOnRow(row) {
  const even = [0, 2, 4, 6, 8];
  const odd = [1, 3, 5, 7, 9];
  const randomIndex = Math.floor(Math.random() * even.length); // Generates a random index
  const randomEvenNumber = even[randomIndex]; // Gets the random number from the array
  const randomOddNumber = odd[randomIndex]; // Gets the random number from the array

  let everyOtherColEven = randomEvenNumber;
  let everyOtherColOdd = randomOddNumber;
  if (row % 2 === 0) {
    return everyOtherColEven;
  } else if (row % 2 !== 0) {
    return everyOtherColOdd;
  }
}

const noRepeatSet = new Set(); // Put set outside of function so that it accumulate new coordinates and not refresh itself when called
let randomRow, randomCol, coordinates;

const priorHitsSet = new Set();
const priorHitsArray = Array.from(priorHitsSet);
const lastHitTargetWereTheseCoordinates =
  priorHitsArray[priorHitsArray.length - 1];
const hunterCoordinateSet = new Set();
const hunterCoordinateArray = Array.from(hunterCoordinateSet);

// let adjacentCoordinates = [
//   `${randomRowStored + 1},${randomColStored}`, // Down
//   `${randomRowStored - 1},${randomColStored}`, // Up
//   `${randomRowStored},${randomColStored + 1}`, // Right
//   `${randomRowStored},${randomColStored - 1}`, // Left
//   // `${randomRowStored + 1},${randomColStored + 1}`, // Down-right (diagonal)
//   // `${randomRowStored - 1},${randomColStored - 1}`, // Up-left (diagonal)
//   // `${randomRowStored + 1},${randomColStored - 1}`, // Down-left (diagonal)
//   // `${randomRowStored - 1},${randomColStored + 1}`, // Up-right (diagonal)
// ];

// export function getUniqueRandomCoordinates(
//   lastPlayer2ComputerAttack,
//   randomRowStored,
//   randomColStored
// ) {
//   // If last attack was a hit, attempt to target nearby coordinates
//   if (lastPlayer2ComputerAttack === "HIT!!!") {
//     const lastHitCoordinates = `${randomRowStored},${randomColStored}`;
//     priorHitsSet.add(lastHitCoordinates);

//     console.log(lastHitCoordinates); // Output: "4,5"
//     console.log(priorHitsSet);

//     let attempts = 0;
//     let foundValidCoordinate = false;

//     // Try to find a valid adjacent coordinate that hasn't been used
//     while (attempts < 10 && !foundValidCoordinate) {
//       let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
//       coordinates = adjacentCoordinates[randomIndex];
//       [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col

//       // Check if the coordinates are valid (within bounds and not used before)
//       if (
//         randomRow >= 0 &&
//         randomRow < 10 && // Ensure it's within bounds
//         randomCol >= 0 &&
//         randomCol < 10 &&
//         !noRepeatSet.has(coordinates) // Ensure it's not a previously used coordinate
//       ) {
//         foundValidCoordinate = true; // A valid coordinate is found
//       } else {
//         attempts++; // Increase the number of attempts
//       }
//     }

//     // If no valid coordinate found after 10 attempts, default to a random one
//     if (!foundValidCoordinate) {
//       console.log(
//         "No valid adjacent coordinate found after 10 attempts, picking random coordinate."
//       );
//       do {
//         randomRow = getRandomRow();
//         randomCol = getRandomCol();
//         coordinates = `${randomRow},${randomCol}`;
//       } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//     }
//   } else if (
//     lastPlayer2ComputerAttack === "Double or nothing!!"
//     // || lastPlayer2ComputerAttack === "Triple or nothing!"
//   ) {
//     // Get the last hit coordinates from the set
//     const [randomRowDoubleOrNothing, randomColDoubleOrNothing] =
//       lastHitTargetWereTheseCoordinates.split(",").map(Number); // Split and map to row and col

//     console.log(
//       `Prior coordinates: ${randomRowDoubleOrNothing},${randomColDoubleOrNothing}`
//     );

//     let adjacentCoordinates = [
//       `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing}`, // Down
//       `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing}`, // Up
//       `${randomRowDoubleOrNothing},${randomColDoubleOrNothing + 1}`, // Right
//       `${randomRowDoubleOrNothing},${randomColDoubleOrNothing - 1}`, // Left
//       // Uncomment these if you want to include diagonals
//       // `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing + 1}`, // Down-right (diagonal)
//       // `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing - 1}`, // Up-left (diagonal)
//       // `${randomRowDoubleOrNothing + 1},${randomColDoubleOrNothing - 1}`, // Down-left (diagonal)
//       // `${randomRowDoubleOrNothing - 1},${randomColDoubleOrNothing + 1}`, // Up-right (diagonal)
//     ];

//     let attempts = 0;
//     let foundValidCoordinate = false;

//     // Try to find a valid adjacent coordinate that hasn't been used
//     while (attempts < 10 && !foundValidCoordinate) {
//       let randomIndex = Math.floor(Math.random() * adjacentCoordinates.length);
//       coordinates = adjacentCoordinates[randomIndex];
//       [randomRow, randomCol] = coordinates.split(",").map(Number); // Split into row and col

//       // Check if the coordinates are valid (within bounds and not used before)
//       if (
//         randomRow >= 0 &&
//         randomRow < 10 && // Ensure it's within bounds
//         randomCol >= 0 &&
//         randomCol < 10 &&
//         !noRepeatSet.has(coordinates) // Ensure it's not a previously used coordinate
//       ) {
//         foundValidCoordinate = true; // A valid coordinate is found
//       } else {
//         attempts++; // Increase the number of attempts
//       }
//     }

//     // If no valid coordinate found after 10 attempts, default to a random one
//     if (!foundValidCoordinate) {
//       console.log(
//         "No valid adjacent coordinate found after 10 attempts, picking random coordinate."
//       );
//       do {
//         randomRow = getRandomRow();
//         randomCol = getRandomCol();
//         coordinates = `${randomRow},${randomCol}`;
//       } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//     }
//   } else if (
//     lastPlayer2ComputerAttack === "miss" &&
//     hunterCoordinateArray.length > 20
//   ) {
//     do {
//       randomRow = getRandomRow();
//       randomCol = getRandomCol();
//       coordinates = `${randomRow},${randomCol}`;
//     } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//   } else {
//     do {
//       randomRow = getRandomRow();
//       randomCol = everyOtherColDependingOnRow(randomRow);
//       coordinates = `${randomRow},${randomCol}`;
//       hunterCoordinateSet.add(coordinates);
//       console.log(`every other ${coordinates}`);
//       console.log(hunterCoordinateArray);
//     } while (noRepeatSet.has(coordinates)); // Ensure uniqueness
//   }

//   // Add the unique coordinate to the set
//   noRepeatSet.add(coordinates);
//   console.log(noRepeatSet);
//   console.log(hunterCoordinateSet);

//   return {
//     randomRow,
//     randomCol,
//   };
// }
// PLAYER 1: DEPLOY YOUR SHIPS. Rotate ships to select axis. Click on any ship to highlight it in red, then click the desired deployment zone square to place ship. Or, click RANDOM BUTTON to make random ship placements.