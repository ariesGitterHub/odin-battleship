import { 
  gridNumRows,
  gridNumCols 
}  from "../index.js";

import {
  addMessage,
  clearMessage,
  everyOtherColDependingOnRow,
  getRandomCol,
  getRandomRow,
} from "./functionsOther.js";

const noRepeatCoordinatesSet = new Set();
const priorHitCoordinatesSet = new Set();
const hunterCoordinatesSet = new Set();
const priorHitCoordinatesArray = Array.from(priorHitCoordinatesSet);

// let hitOrMiss,
//   randomRow,
//   randomCol,
//   randomRowStored,
//   randomColStored,
//   // lastLastPlayer2ComputerAttack,
//   // lastLastLastPlayer2ComputerAttack,
//   coordinates;

let lastPlayer2ComputerAttack = "start";
let player2FocusesOnAdjacentSquares = 0;
let moveOnToNextAttackType = false;
// const currentSetTimeoutValue = 2500; // Time Delay: uses on player2 computer attacks too sounds to execute more fully
const currentSetTimeoutValue = 0 // No delay - speedier for testing purposes


function getUniqueCoordinate(callback) {
  let coordinates;
  do {
    coordinates = callback();
  } while (noRepeatCoordinatesSet.has(coordinates));
  noRepeatCoordinatesSet.add(coordinates);
  return coordinates;
}

function targetRandomCoordinates() {
  let coordinatesOnlyHunter;
  if (hunterCoordinatesSet.size >= 41) {
    // Basic random attacks
    const coordinates = getUniqueCoordinate(() => {
      console.log("Attack Style: Basic Random Attack Pattern");
      return `${getRandomRow()},${getRandomCol()}`;
    });
    hunterCoordinatesSet.add(coordinates);
  } else {
    // Start off attacks by hunting every other square
    const coordinates = getUniqueCoordinate(() => {
      console.log("Attack Style: Checkerboard 'Hunter' Attack Pattern");
      const randomRow = getRandomRow();
      return `${randomRow},${everyOtherColDependingOnRow(randomRow)}`;
    });
    hunterCoordinatesSet.add(coordinates);
  }

  // const [randomRow, randomCol] = coordinates.split(",").map(Number);
    const [randomRow, randomCol] = coordinates.split(",").map(Number);
  return { randomRow, randomCol };
}

function handleAttack(hitOrMiss, randomRow, randomCol) {
  if (hitOrMiss === "hit") {
    lastPlayer2ComputerAttack = hitOrMiss;
    player2FocusesOnAdjacentSquares = 3;
    priorHitCoordinatesSet.add(`${randomRow},${randomCol}`);
  } else if (hitOrMiss === "miss") {
    lastPlayer2ComputerAttack = hitOrMiss;
  } else {
    let { randomRow, randomCol } = targetRandomCoordinates();
    hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
  }
}

export function player2ComputerAttack() {
  // if (
    // !stopGameHaveWinner &&
    // player2.playerType === "computer" &&
    // playerTurn % 2 !== 0
  // ) {
    setTimeout(() => {
      // let { randomRow, randomCol };
      if (
        lastPlayer2ComputerAttack === "hit" ||
        player2FocusesOnAdjacentSquares > 0
      ) {
        ({ randomRow, randomCol } = targetAdjacentCoordinates());
      } else {
        ({ randomRow, randomCol } = targetRandomCoordinates());
      }

      hitOrMiss = testGame1.receiveAttack(randomRow, randomCol);
      console.log(`It's a ${hitOrMiss}`);
      clearMessage();
      addMessage(
        `PLAYER 2's attack is a ${hitOrMiss} at square: (${randomRow}, ${randomCol}). PLAYER 1's TURN!`
      );

      handleAttack(hitOrMiss, randomRow, randomCol);
      console.log(
        noRepeatCoordinatesSet,
        hunterCoordinatesSet,
        priorHitCoordinatesSet
      );

      // Additional code like sound effects, color updates, etc.
    }, currentSetTimeoutValue);
  }
// }
function targetAdjacentCoordinates() {
  const coordinateDistance = 1; // Can be adjusted dynamically, if necessary
  const adjacentCoordinates = [
    { row: randomRowStored + coordinateDistance, col: randomColStored }, // Down
    { row: randomRowStored - coordinateDistance, col: randomColStored }, // Up
    { row: randomRowStored, col: randomColStored + coordinateDistance }, // Right
    { row: randomRowStored, col: randomColStored - coordinateDistance }  // Left
  ];

  return getValidAdjacentCoordinate(adjacentCoordinates);
}

function getValidAdjacentCoordinate(coordinates) {
  for (let attempt = 0; attempt < 10; attempt++) {
    const randomIndex = Math.floor(Math.random() * coordinates.length);
    const { row, col } = coordinates[randomIndex];
    const coordinate = `${row},${col}`;
    if (isValidCoordinate(row, col) && !noRepeatCoordinatesSet.has(coordinate)) {
      noRepeatCoordinatesSet.add(coordinate);
      return { randomRow: row, randomCol: col };
    }
  }
  // Handle fallback if no valid coordinate found
  return targetRandomCoordinates();
}

function isValidCoordinate(row, col) {
  return row >= 0 && row < gridNumRows && col >= 0 && col < gridNumCols;
}
