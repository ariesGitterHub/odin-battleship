import { createElement } from "./functionTemplates.js";
import { getBtnElements } from "./domQueries.js";
import { getBoardElements } from "./domQueries.js";

export function createBtnElements() {
  const { mainBtnContainer } = getBtnElements();
  const mainBtnConfigs = [
    { label: "PLAYER 1 vs COMPUTER", id: "btn-pvsc" },
    { label: "PLAYER 1 vs PLAYER 2", id: "btn-pvsp" },
    { label: "Quit", id: "btn-quit-game" },
    { label: "Start", id: "btn-start-game" },
    { label: "Hide Screen", id: "btn-hide-screen" },
    { label: "Unlock", id: "btn-unlock-screen" },
  ];

  function createMainActionButtons(buttonConfigs) {
    return buttonConfigs.map(({ label, id }) => {
      return createElement(
        "button",
        { id, class: "btn-a text-effect-dark" },
        label
      );
    });
  }
  const mainBtns = createMainActionButtons(mainBtnConfigs);

  mainBtnContainer.append(...mainBtns);

  // Buttons in #p1-place-ships and #p2-place-ships
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
