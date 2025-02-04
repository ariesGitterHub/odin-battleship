// Old functions that were replaced by DRY-er versions, keep for reference. Some functions are aborted attempts to solve sundry issues, keep these in case I go back to an old idea.

export function rotatePlaceShips1() {
  const p1BtnRotate = document.querySelector("#p1-btn-rotate");
  const p1X5Grid = document.querySelector("#p1-x5-grid");
  const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p1BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      allP1PlaceShips.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      allP1PlaceShips.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }

    p1X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}

export function rotatePlaceShips2() {
  const p2BtnRotate = document.querySelector("#p2-btn-rotate");
  const p2X5Grid = document.querySelector("#p2-x5-grid");
  const placeShipClass = document.querySelectorAll(".place-ship");
  let currentRotation = 0; // 0 = horizontal axis
  let rotationCount = 0;
  p2BtnRotate.addEventListener("click", () => {
    rotationCount += 1;
    if (rotationCount % 2 !== 0) {
      currentRotation = 90;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "v";
      });
    } else {
      currentRotation = 0;
      placeShipClass.forEach((axis) => {
        axis.dataset.axis = "h";
      });
    }

    p2X5Grid.style.transform = `rotate(${currentRotation}deg`;
  });
}

export function highlightPlaceShips1() {
  const shipA1 = document.querySelector("#place-a1");
  const shipB1 = document.querySelector("#place-b1");
  const shipD1 = document.querySelector("#place-d1");
  const shipS1 = document.querySelector("#place-s1");
  const shipC1 = document.querySelector("#place-c1");

  const allP1PlaceShips = document.querySelectorAll(".all-p1-place-ships");

  allP1PlaceShips.forEach((ship) =>
    ship.addEventListener("click", () => {
      if (ship.src === bA && ship.dataset.selected === "") {
        ship.src = hA;
        ship.dataset.selected = "yes";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hA && ship.dataset.selected === "yes") {
        ship.src = bA;
        ship.dataset.selected = "";
        shipB1.src = bB;
        shipD1.src = bD;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bB && ship.dataset.selected === "") {
        ship.src = hB;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hB && ship.dataset.selected === "yes") {
        ship.src = bB;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipD1.src = bD;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bD && ship.dataset.selected === "") {
        ship.src = hD;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hD && ship.dataset.selected === "yes") {
        ship.src = bD;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipS1.src = bS;
        shipC1.src = bC;
      }

      if (ship.src === bS && ship.dataset.selected === "") {
        ship.src = hS;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipC1.src = bC;
        shipC1.dataset.selected = "";
      } else if (ship.src === hS && ship.dataset.selected === "yes") {
        ship.src = bS;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipD1.src = bD;
        shipC1.src = bC;
      }

      if (ship.src === bC && ship.dataset.selected === "") {
        ship.src = hC;
        ship.dataset.selected = "yes";
        shipA1.src = bA;
        shipA1.dataset.selected = "";
        shipB1.src = bB;
        shipB1.dataset.selected = "";
        shipD1.src = bD;
        shipD1.dataset.selected = "";
        shipS1.src = bS;
        shipS1.dataset.selected = "";
      } else if (ship.src === hC && ship.dataset.selected === "yes") {
        ship.src = bC;
        ship.dataset.selected = "";
        shipA1.src = bA;
        shipB1.src = bB;
        shipD1.src = bD;
        shipS1.src = bS;
      }
    })
  );
}

export function highlightPlaceShips2() {
  const shipA2 = document.querySelector("#place-a2");
  const shipB2 = document.querySelector("#place-b2");
  const shipD2 = document.querySelector("#place-d2");
  const shipS2 = document.querySelector("#place-s2");
  const shipC2 = document.querySelector("#place-c2");

  const allP2PlaceShips = document.querySelectorAll(".all-p2-place-ships");

  allP2PlaceShips.forEach((ship) =>
    ship.addEventListener("click", () => {
      // Change if statements to a switch...later
      if (ship.src === bA && ship.dataset.selected === "") {
        // ship.style.scale = "2"
        ship.src = hA;
        ship.dataset.selected = "yes";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hA && ship.dataset.selected === "yes") {
        ship.src = bA;
        ship.dataset.selected = "";
        shipB2.src = bB;
        shipD2.src = bD;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bB && ship.dataset.selected === "") {
        ship.src = hB;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hB && ship.dataset.selected === "yes") {
        ship.src = bB;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipD2.src = bD;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bD && ship.dataset.selected === "") {
        ship.src = hD;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hD && ship.dataset.selected === "yes") {
        ship.src = bD;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipS2.src = bS;
        shipC2.src = bC;
      }

      if (ship.src === bS && ship.dataset.selected === "") {
        ship.src = hS;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipC2.src = bC;
        shipC2.dataset.selected = "";
      } else if (ship.src === hS && ship.dataset.selected === "yes") {
        ship.src = bS;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipD2.src = bD;
        shipC2.src = bC;
      }

      if (ship.src === bC && ship.dataset.selected === "") {
        ship.src = hC;
        ship.dataset.selected = "yes";
        shipA2.src = bA;
        shipA2.dataset.selected = "";
        shipB2.src = bB;
        shipB2.dataset.selected = "";
        shipD2.src = bD;
        shipD2.dataset.selected = "";
        shipS2.src = bS;
        shipS2.dataset.selected = "";
      } else if (ship.src === hC && ship.dataset.selected === "yes") {
        ship.src = bC;
        ship.dataset.selected = "";
        shipA2.src = bA;
        shipB2.src = bB;
        shipD2.src = bD;
        shipS2.src = bS;
      }
    })
  );
}

export function highlightPlaceShips(boardNum) {
  const shipA = document.querySelector(`#place-a${boardNum}`);
  const shipB = document.querySelector(`#place-b${boardNum}`);
  const shipD = document.querySelector(`#place-d${boardNum}`);
  const shipS = document.querySelector(`#place-s${boardNum}`);
  const shipC = document.querySelector(`#place-c${boardNum}`);

  const allPlaceShipsClass = document.querySelectorAll(
    `.all-p${boardNum}-place-ships`
  );

  // const highlightShipImg = { "a": hA, "b": hB, "d": hD, "s": hS, "c": hC };
  // const blackShipImg = { 'a': bA, "b": bB, "d": bD, "s": bS, "c": bC };
  // let otherShips = ["a", "b", "d", "s", "c"]
  // const otherShipIds = { "a": shipA, "b": shipB, "d": shipD, "s": shipS, "c": shipC };

  const shipData = {
    a: { id: shipA, blackImg: bA, highlightImg: hA },
    b: { id: shipB, blackImg: bB, highlightImg: hB },
    d: { id: shipD, blackImg: bD, highlightImg: hD },
    s: { id: shipS, blackImg: bS, highlightImg: hS },
    c: { id: shipC, blackImg: bC, highlightImg: hC },
  };

  // const shipData = {
  //   a: { blackImg: bA, highlightImg: hA },
  //   b: { blackImg: bB, highlightImg: hB },
  //   d: { blackImg: bD, highlightImg: hD },
  //   s: { blackImg: bS, highlightImg: hS },
  //   c: { blackImg: bC, highlightImg: hC },
  // };

  allPlaceShipsClass.forEach((ship) =>
    ship.addEventListener("click", () => {
      const shipKey = ship.dataset.ship; // This will be 'a', 'b', etc.
      const shipId = shipData[shipKey].id;
      // Get all the keys from shipData
      const allShipKeys = Object.keys(shipData);

      // Filter out the current shipKey
      const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

      // Access the black and highlight images using the shipKey
      // const shipId = shipData[shipKey].id; // Not needed
      const blackImg = shipData[shipKey].blackImg;
      const highlightImg = shipData[shipKey].highlightImg;

      if (ship.src === blackImg && ship.dataset.selected === "") {
        ship.src = highlightImg;
        ship.dataset.selected = "yes";

        otherShipKeys.forEach((key) => {
          // Example action: Reset each ship's selected state and image
          const otherShip = shipData[key]; // Access the ship object using the key
          // Perform actions on otherShip, e.g., reset the image or the selected state
          console.log(`Resetting ship: ${key}`, otherShip);

          // For example, reset the image to the black image and unselect the ship:
          const shipElement = document.querySelector(`[data-ship="${key}"]`);
          shipElement.src = otherShip.blackImg; // Reset to black image
          shipElement.dataset.selected = ""; // Unselect the ship
        });
      }

      // else if (ship.src === highlightShipImg[ship.dataset.ship] && ship.dataset.selected === "yes") {
      //   ship.src = bA;
      //   ship.dataset.selected = "";
      //   // shipB.src = bB;
      //   // shipD.src = bD;
      //   // shipS.src = bS;
      //   // shipC.src = bC;
      // }
      else if (ship.src === highlightImg && ship.dataset.selected === "yes") {
        ship.src = blackImg;
        ship.dataset.selected = "";

        otherShipKeys.forEach((key) => {
          // Example action: Reset each ship's selected state and image
          const otherShip = shipData[key]; // Access the ship object using the key
          // Perform actions on otherShip, e.g., reset the image or the selected state
          console.log(`Resetting ship: ${key}`, otherShip);

          // For example, reset the image to the black image and unselect the ship:
          const shipElement = document.querySelector(`[data-ship="${key}"]`);
          shipElement.src = otherShip.blackImg; // Reset to black image
          shipElement.dataset.selected = ""; // Unselect the ship
        });
      }

      // if (ship.src === bB && ship.dataset.selected === "") {
      //   ship.src = hB;
      //   ship.dataset.selected = "yes";
      //   shipA.src = bA;
      //   shipA.dataset.selected = "";
      //   shipD.src = bD;
      //   shipD.dataset.selected = "";
      //   shipS.src = bS;
      //   shipS.dataset.selected = "";
      //   shipC.src = bC;
      //   shipC.dataset.selected = "";
      // } else if (ship.src === hB && ship.dataset.selected === "yes") {
      //   ship.src = bB;
      //   ship.dataset.selected = "";
      //   shipA.src = bA;
      //   shipD.src = bD;
      //   shipS.src = bS;
      //   shipC.src = bC;
      // }

      // if (ship.src === bD && ship.dataset.selected === "") {
      //   ship.src = hD;
      //   ship.dataset.selected = "yes";
      //   shipA.src = bA;
      //   shipA.dataset.selected = "";
      //   shipB.src = bB;
      //   shipB.dataset.selected = "";
      //   shipS.src = bS;
      //   shipS.dataset.selected = "";
      //   shipC.src = bC;
      //   shipC.dataset.selected = "";
      // } else if (ship.src === hD && ship.dataset.selected === "yes") {
      //   ship.src = bD;
      //   ship.dataset.selected = "";
      //   shipA.src = bA;
      //   shipB.src = bB;
      //   shipS.src = bS;
      //   shipC.src = bC;
      // }

      // if (ship.src === bS && ship.dataset.selected === "") {
      //   ship.src = hS;
      //   ship.dataset.selected = "yes";
      //   shipA.src = bA;
      //   shipA.dataset.selected = "";
      //   shipB.src = bB;
      //   shipB.dataset.selected = "";
      //   shipD.src = bD;
      //   shipD.dataset.selected = "";
      //   shipC.src = bC;
      //   shipC.dataset.selected = "";
      // } else if (ship.src === hS && ship.dataset.selected === "yes") {
      //   ship.src = bS;
      //   ship.dataset.selected = "";
      //   shipA.src = bA;
      //   shipB.src = bB;
      //   shipD.src = bD;
      //   shipC.src = bC;
      // }

      // if (ship.src === bC && ship.dataset.selected === "") {
      //   ship.src = hC;
      //   ship.dataset.selected = "yes";
      //   shipA.src = bA;
      //   shipA.dataset.selected = "";
      //   shipB.src = bB;
      //   shipB.dataset.selected = "";
      //   shipD.src = bD;
      //   shipD.dataset.selected = "";
      //   shipS.src = bS;
      //   shipS.dataset.selected = "";
      // } else if (ship.src === hC && ship.dataset.selected === "yes") {
      //   ship.src = bC;
      //   ship.dataset.selected = "";
      //   shipA.src = bA;
      //   shipB.src = bB;
      //   shipD.src = bD;
      //   shipS.src = bS;
      // }
    })
  );
}

export function attackTargetCoordinates1(board) {
    const hitMissTargetCells1 = document.querySelectorAll(
      ".hit-miss-target-cells1"
    );
    // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
    highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
    hitMissTargetCells1.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          console.log(`Coordinates clicked: ${row}, ${col}`);
          console.log(typeof row === "number");
          console.log(testGame1.receiveAttack(row, col));
          addEmojiEffect(player1.playerBoard.board, 1);
          colorSunkShips(testGame1, 1);
          // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
          highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        }
      });
    });
  }

export function attackTargetCoordinates2(board) {
    const hitMissTargetCells2 = document.querySelectorAll(
      ".hit-miss-target-cells2"
    );
    // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
        highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
    hitMissTargetCells2.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          console.log(`Coordinates clicked: ${row}, ${col}`);
          console.log(typeof row === "number");
          console.log(testGame2.receiveAttack(row, col));
          addEmojiEffect(player2.playerBoard.board, 2);
          colorSunkShips(testGame2, 2);
          // highlightEmptyCellOnlyOnHover2(player2.playerBoard.board);
          highlightEmptyCellOnlyOnHover(player2.playerBoard.board, 2);
        }
      });
    });
  }

export function attackTargetCoordinates(boardNum) {
    const hitMissTargetCells = document.querySelectorAll(
      `.hit-miss-target-cells${boardNum}`
    );
    // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
    highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
    hitMissTargetCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Reminder, this converts the string to a number
          col = +matches[2]; // Same as above
          console.log(`Coordinates clicked: ${row}, ${col}`);
          console.log(typeof row === "number");
          console.log(testGame1.receiveAttack(row, col));
          addEmojiEffect(player1.playerBoard.board, 1);
          colorSunkShips(testGame1, 1);
          // highlightEmptyCellOnlyOnHover1(player1.playerBoard.board);
          highlightEmptyCellOnlyOnHover(player1.playerBoard.board, 1);
        }
      });
    });
  }

export function getRowAndColNums(boardNum) {
  const hitMissTargetCells = document.querySelectorAll(
    `.hit-miss-target-cells${boardNum}`
  );

  // Ensure the cells exist
  if (!hitMissTargetCells.length) {
    console.error(`No target cells found for board number: ${boardNum}`);
    return;
  }

  hitMissTargetCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      let targetId = cell.id;
      let regex = /\((\d+),(\d+)\)/;
      let matches = targetId.match(regex);
      let row, col;

      if (matches) {
        row = +matches[1]; // Reminder, this converts the string to a number
        col = +matches[2]; // Same as above
      }
    });
  });
  return {
    row,
    col
  }
}

export function getRowAndColNums(boardNum) {
  return new Promise((resolve, reject) => {
    const hitMissTargetCells = document.querySelectorAll(
      `.hit-miss-target-cells${boardNum}`
    );

    // Ensure the cells exist
    if (!hitMissTargetCells.length) {
      console.error(`No target cells found for board number: ${boardNum}`);
      reject(new Error("No target cells found"));
      return;
    }

    hitMissTargetCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let targetId = cell.id;
        let regex = /\((\d+),(\d+)\)/;
        let matches = targetId.match(regex);
        let row, col;

        if (matches) {
          row = +matches[1]; // Converts string to number
          col = +matches[2]; // Converts string to number
          resolve({ row, col }); // Resolve the promise with the row and col
        }
      });
    });
  });
}

export function orientShipSvgOnShipGrid1(shipType, axis, x, y) {
  const p1ShipBoardCellIndex = document.getElementById(`SG1: (${x},${y})`);
  if (shipType === "a") {
    const shipA1 = createImgShip("ship-a1", "a", `${nA}`, "ship");
    if (axis === "v") {
      shipA1.style.transform = "translateY(4rem) rotate(90deg)";
    } else {
      shipA1.style.transform = "translateX(4rem)";
    }
    p1ShipBoardCellIndex.appendChild(shipA1);
  }

  if (shipType === "b") {
    const shipB1 = createImgShip("ship-b1", "b", `${nB}`, "ship");
    if (axis === "v") {
      shipB1.style.transform = "translateY(3rem) rotate(90deg)";
    } else {
      shipB1.style.transform = "translateX(3rem)";
    }
    p1ShipBoardCellIndex.appendChild(shipB1);
  }

  if (shipType === "d") {
    const shipD1 = createImgShip("ship-d1", "d", `${nD}`, "ship");
    if (axis === "v") {
      shipD1.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipD1.style.transform = "translateX(2rem)";
    }
    p1ShipBoardCellIndex.appendChild(shipD1);
  }

  if (shipType === "s") {
    const shipS1 = createImgShip("ship-s1", "s", `${nS}`, "ship");
    if (axis === "v") {
      shipS1.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipS1.style.transform = "translateX(2rem)";
    }
    p1ShipBoardCellIndex.appendChild(shipS1);
  }

  if (shipType === "c") {
    const shipC1 = createImgShip("ship-c1", "c", `${nC}`, "ship");
    if (axis === "v") {
      shipC1.style.transform = "translateY(1rem) rotate(90deg)";
    } else {
      shipC1.style.transform = "translateX(1rem)";
    }
    p1ShipBoardCellIndex.appendChild(shipC1);
  }
}

export function orientShipSvgOnShipGrid2(shipType, axis, x, y) {
  const p2ShipBoardCellIndex = document.getElementById(`SG2: (${x},${y})`);
  if (shipType === "a") {
    const shipA2 = createImgShip("ship-a2", "a", `${nA}`, "ship");
    if (axis === "v") {
      shipA2.style.transform = "translateY(4rem) rotate(90deg)";
    } else {
      shipA2.style.transform = "translateX(4rem)";
    }
    p2ShipBoardCellIndex.appendChild(shipA2);
  }

  if (shipType === "b") {
    const shipB2 = createImgShip("ship-b2", "b", `${nB}`, "ship");
    if (axis === "v") {
      shipB2.style.transform = "translateY(3rem) rotate(90deg)";
    } else {
      shipB2.style.transform = "translateX(3rem)";
    }
    p2ShipBoardCellIndex.appendChild(shipB2);
  }

  if (shipType === "d") {
    const shipD2 = createImgShip("ship-d2", "d", `${nD}`, "ship");
    if (axis === "v") {
      shipD2.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipD2.style.transform = "translateX(2rem)";
    }
    p2ShipBoardCellIndex.appendChild(shipD2);
  }

  if (shipType === "s") {
    const shipS2 = createImgShip("ship-s2", "s", `${nS}`, "ship");
    if (axis === "v") {
      shipS2.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipS2.style.transform = "translateX(2rem)";
    }
    p2ShipBoardCellIndex.appendChild(shipS2);
  }

  if (shipType === "c") {
    const shipC2 = createImgShip("ship-c2", "c", `${nC}`, "ship");
    if (axis === "v") {
      shipC2.style.transform = "translateY(1rem) rotate(90deg)";
    } else {
      shipC2.style.transform = "translateX(1rem)";
    }
    p2ShipBoardCellIndex.appendChild(shipC2);
  }
}

export function orientShipSvgOnShipGrid(boardNum, shipType, axis, x, y) {
  const baseId = `${boardNum === 1 ? "SG1" : "SG2"}: (${x},${y})`;
   const shipBoardCellId = document.getElementById(baseId);
  if (shipType === "a") {
    const shipA = createImgShip(`ship-a${boardNum}`, "a", `${nA}`, "ship");
    if (axis === "v") {
      shipA.style.transform = "translateY(4rem) rotate(90deg)";
    } else {
      shipA.style.transform = "translateX(4rem)";
    }
    shipBoardCellId.appendChild(shipA);
  }

  if (shipType === "b") {
    const shipB = createImgShip(`ship-b${boardNum}`, "b", `${nB}`, "ship");
    if (axis === "v") {
      shipB.style.transform = "translateY(3rem) rotate(90deg)";
    } else {
      shipB.style.transform = "translateX(3rem)";
    }
    shipBoardCellId.appendChild(shipB);
  }

  if (shipType === "d") {
    const shipD = createImgShip(`ship-d${boardNum}`, "d", `${nD}`, "ship");
    if (axis === "v") {
      shipD.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipD.style.transform = "translateX(2rem)";
    }
    shipBoardCellId.appendChild(shipD);
  }

  if (shipType === "s") {
    const shipS = createImgShip(`ship-s${boardNum}`, "s", `${nS}`, "ship");
    if (axis === "v") {
      shipS.style.transform = "translateY(2rem) rotate(90deg)";
    } else {
      shipS.style.transform = "translateX(2rem)";
    }
    shipBoardCellId.appendChild(shipS);
  }

  if (shipType === "c") {
    const shipC = createImgShip(`ship-c${boardNum}`, "c", `${nC}`, "ship");
    if (axis === "v") {
      shipC.style.transform = "translateY(1rem) rotate(90deg)";
    } else {
      shipC.style.transform = "translateX(1rem)";
    }
    shipBoardCellId.appendChild(shipC);
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

export function createHitMissGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `HMG1: (${i},${j})`,
        class: "hit-miss-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetHitMissGrid1(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-HMG1: (${i},${j})`,
        class: "hit-miss-target-cells1",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createHitMissGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `HMG2: (${i},${j})`,
        class: "hit-miss-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function createTargetHitMissGrid2(board) {
  let grid = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const gridCell = createElement("div", {
        id: `T-HMG2: (${i},${j})`,
        class: "hit-miss-target-cells2",
      });
      grid.push(gridCell);
    }
  }
  return grid;
}

export function addEmojiEffect1(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG1: (${i},${j})`);
      let cellTarget = document.getElementById(`T-HMG1: (${i},${j})`);
      let cellShipTarget = document.getElementById(`T-SG1: (${i},${j})`);
      // const explosionRotation = [0, 90, 180, 270];
      // const randomRotation = explosionRotation[Math.floor(Math.random() * explosionRotation.length)
      //   ];
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        // cell.style.transform = `rotate(${randomRotation}deg)`;
        cellTarget.innerText = "💥";
        // cellTarget.style.transform = `rotate(${randomRotation}deg)`;
        cellShipTarget.style.backgroundColor = "var(--hit)";
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
      } else {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
      }
    }
  }
}

export function addEmojiEffect2(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cell = document.getElementById(`HMG2: (${i},${j})`);
      let cellTarget = document.getElementById(`T-HMG2: (${i},${j})`);
      let cellShipTarget = document.getElementById(`T-SG2: (${i},${j})`);
      // const explosionRotation = [0, 90, 180, 270];
      // const explosionRotation = [0];
      // const randomRotation =
      //   explosionRotation[
      //     Math.floor(Math.random() * explosionRotation.length)
      //   ];
      if (
        board[i][j] === "A!" ||
        board[i][j] === "B!" ||
        board[i][j] === "D!" ||
        board[i][j] === "S!" ||
        board[i][j] === "C!"
      ) {
        cell.innerText = "💥";
        // cell.style.transform = `rotate(${randomRotation}deg)`;
        cellTarget.innerText = "💥";
        // cellTarget.style.transform = `rotate(${randomRotation}deg)`;
        cellShipTarget.style.backgroundColor = "var(--hit)";
      } else if (board[i][j] === "mm") {
        cell.innerText = "💨";
        cell.style.transform = "rotate(-90deg)";
        cellTarget.innerText = "💨";
        cellTarget.style.transform = "rotate(-90deg)";
        cellShipTarget.style.backgroundColor = "var(--miss)";
      } else {
        cell.innerText = "  ";
        cellTarget.innerText = "  ";
      }
    }
  }
}

export function highlightEmptyCellOnlyOnHover1(board) {
  const p1PlaceShips = document.querySelector("#p1-place-ships");

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy1 = document.getElementById(`HMG1: (${i},${j})`);
      let cellTarget1 = document.getElementById(`T-HMG1: (${i},${j})`);
      if (
        board[i][j] === "--" ||
        board[i][j] === "a" ||
        board[i][j] === "b" ||
        board[i][j] === "d" ||
        board[i][j] === "s" ||
        board[i][j] === "c"
      ) {
        if (p1PlaceShips.style.display === "none") {
          cellDeploy1.classList.add("mouse-deploy");
        }
        cellTarget1.classList.add("mouse-target");
      } else {
        cellTarget1.classList.remove("mouse-target");
      }
    }
  }
}

export function highlightEmptyCellOnlyOnHover2(board) {
  const p2PlaceShips = document.querySelector("#p2-place-ships");

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let cellDeploy2 = document.getElementById(`HMG2: (${i},${j})`);
      let cellTarget2 = document.getElementById(`T-HMG2: (${i},${j})`);
      if (
        board[i][j] === "--" ||
        board[i][j] === "a" ||
        board[i][j] === "b" ||
        board[i][j] === "d" ||
        board[i][j] === "s" ||
        board[i][j] === "c"
      ) {
        if (p2PlaceShips.style.display === "none") {
          cellDeploy2.classList.add("mouse-deploy");
        }
        cellTarget2.classList.add("mouse-target");
      } else {
        cellTarget2.classList.remove("mouse-target");
      }
    }
  }
}