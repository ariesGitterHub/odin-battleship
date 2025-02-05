import { createElement } from "./basicFunctionTemplates.js";
import { getBtnElements } from "./domQueries.js";
import { getBoardElements } from "./domQueries.js";


// export function createBtnElements() {
//   // buttons in #main-btn-container

//   const { mainBtnContainer } = getBtnElements();
//   const btnPvsC = createElement(
//     "button",
//     { id: "btn-pvsc", class: "btn-a text-effect-dark" },
//     "Player 1 vs Computer"
//   );
//   const btnPvsP = createElement(
//     "button",
//     { id: "btn-pvsp", class: "btn-a text-effect-dark" },
//     "Player 1 vs Player 2"
//   );
//   const btnQuitGame = createElement(
//     "button",
//     { id: "btn-quit-game", class: "btn-a text-effect-dark" },
//     "Quit Game"
//   );
//   const btnStartGame = createElement(
//     "button",
//     { id: "btn-start-game", class: "btn-a text-effect-dark" },
//     "Start Game"
//   );
//   mainBtnContainer.append(btnPvsC, btnPvsP, btnQuitGame, btnStartGame);

//   // buttons in #p1-place-ships and #p2-place-ships

//   const { p1BtnContainer, p2BtnContainer } = getBoardElements();
//   const rotate = "Rotate";
//   const undo = "Undo";
//   const clear = "Clear";
//   const random = "Random";
//   const p1BtnRotate = createElement(
//     "button",
//     { id: "p1-btn-rotate", class: "btn-b text-effect-dark" },
//     `${rotate}`
//   );
//   const p2BtnRotate = createElement(
//     "button",
//     { id: "p2-btn-rotate", class: "btn-b text-effect-dark" },
//     `${rotate}`
//   );
//   const p1BtnUndo = createElement(
//     "button",
//     { id: "p1-btn-undo", class: "btn-b text-effect-dark" },
//     `${undo}`
//   );
//   const p2BtnUndo = createElement(
//     "button",
//     { id: "p2-btn-undo", class: "btn-b text-effect-dark" },
//     `${undo}`
//   );
//   const p1BtnClear = createElement(
//     "button",
//     { id: "p1-btn-clear", class: "btn-b text-effect-dark" },
//     `${clear}`
//   );
//   const p2BtnClear = createElement(
//     "button",
//     { id: "p2-btn-clear", class: "btn-b text-effect-dark" },
//     `${clear}`
//   );
//   const p1BtnRandom = createElement(
//     "button",
//     { id: "p1-btn-random", class: "btn-b text-effect-dark" },
//     `${random}`
//   );
//   const p2BtnRandom = createElement(
//     "button",
//     { id: "p2-btn-random", class: "btn-b text-effect-dark" },
//     `${random}`
//   );
//   p1BtnContainer.append(p1BtnRotate, p1BtnUndo, p1BtnClear, p1BtnRandom);
//   p2BtnContainer.append(p2BtnRotate, p2BtnUndo, p2BtnClear, p2BtnRandom);
// }

export function createBtnElements() {

  // buttons in #main-btn-container

  const { mainBtnContainer } = getBtnElements();

    const mainBtnConfigs = [
      { label: "Player 1 vs Computer", id: "btn-pvsc" },
      { label: "Player 1 vs Player 2", id: "btn-pvsp" },
      { label: "Quit Game", id: "btn-quit-game" },
      { label: "Start Game", id: "btn-start-game" },
    ];

  // Function to create buttons dynamically
  function createMainActionButtons(buttonConfigs) {
    return buttonConfigs.map(({ label, id }) => {
      return createElement(
        "button",
        { id, class: "btn-a text-effect-dark" },
        label
      );
    });
  }

  // Create the buttons and append to the container
  const mainBtns = createMainActionButtons(mainBtnConfigs);
  mainBtnContainer.append(...mainBtns);

  // buttons in #p1-place-ships and #p2-place-ships

  const { p1BtnContainer, p2BtnContainer } = getBoardElements();

    const placeShipBtnConfigs = [
      { label: "Rotate", idPrefix: "rotate" },
      { label: "Undo", idPrefix: "undo" },
      { label: "Clear", idPrefix: "clear" },
      { label: "Random", idPrefix: "random" },
    ];

  function createPlaceShipControlBtns(buttonConfigs, playerId) {
    return buttonConfigs.map(({ label, idPrefix }) => {
      const id = `${playerId}-btn-${idPrefix}`;
      return createElement(
        "button",
        { id, class: "btn-b text-effect-dark" },
        label
      );
    });
  }
  const p1PlaceShipBtns = createPlaceShipControlBtns(placeShipBtnConfigs, "p1");
  const p2PlaceShipBtns = createPlaceShipControlBtns(placeShipBtnConfigs, "p2");

  p1BtnContainer.append(...p1PlaceShipBtns);
  p2BtnContainer.append(...p2PlaceShipBtns);
}