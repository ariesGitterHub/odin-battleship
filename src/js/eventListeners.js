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
// import hP from "../assets/ship1P-r.svg";

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

export function unHighlightPlaceShips(boardNum) {
  const allPlaceShipsClass = document.querySelectorAll(
    `.all-p${boardNum}-place-ships`
  );

  const shipData = {
    a: { blackImg: bA, highlightImg: hA },
    b: { blackImg: bB, highlightImg: hB },
    d: { blackImg: bD, highlightImg: hD },
    s: { blackImg: bS, highlightImg: hS },
    c: { blackImg: bC, highlightImg: hC },
  };

  allPlaceShipsClass.forEach((ship) =>{
    // ship.addEventListener("click", () => {
      const shipKey = ship.dataset.ship;

      // This hits ALL ship keys for the current board
      const allShipKeys = Object.keys(shipData);
      const otherShipKeys = allShipKeys.filter((key) => key !== shipKey);

      // Black and highlight images
      const blackImg = shipData[shipKey].blackImg;
      const highlightImg = shipData[shipKey].highlightImg;

      // If this ship is already highlighted, unhighlight it and reset others for this board
     if (ship.src === highlightImg 
      // && ship.dataset.selected === "yes"
    ) {
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
    // })
  }
  );
}

// export function clearPlaceShips(boardNum) {
//   const btnClearId = document.querySelector(`#p${boardNum}-btn-clear`);
//   const shipCellsId = document.querySelectorAll(`.ship-cells${boardNum}`);
//   const placeA = document.querySelector(`#place-a${boardNum}`);
//   const placeB = document.querySelector(`#place-b${boardNum}`);
//   const placeD = document.querySelector(`#place-d${boardNum}`);
//   const placeS = document.querySelector(`#place-s${boardNum}`);
//   const placeC = document.querySelector(`#place-c${boardNum}`);

//   // const allPlaceShipsClass = document.querySelectorAll(
//   //   `.all-p${boardNum}-place-ships`
//   // );

//   btnClearId.addEventListener("click", () => {
//     placeA.style.display = "flex";
//     placeB.style.display = "flex";
//     placeD.style.display = "flex";
//     placeS.style.display = "flex";
//     placeC.style.display = "flex";
//     const images = document.querySelectorAll("img");
//     shipCellsId.forEach((cell) => {
//       if (cell.hasChildNodes()) {
//         cell.removeChild(images);
//       }
//     });
//   });
// }
