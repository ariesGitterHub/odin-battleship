import { createElement} from "./basicFunctionTemplates.js";

export function createStartContentElements() {
  const startContent = document.querySelector("#start-content");
  const btnPvsC = createElement(
    "button",
    { id: "btn-pvsc", class: "btn-a text-effect-dark" },
    "Player 1 vs Computer"
  );

  const btnPvsP = createElement(
    "button",
    { id: "btn-pvsp", class: "btn-a text-effect-dark" },
    "Player 1 vs Player 2"
  );

  const btnQuitGame = createElement(
    "button",
    { id: "btn-quit-game", class: "btn-a text-effect-dark" },
    "Quit Game"
  );

    const btnStartGame = createElement(
      "button",
      { id: "btn-start-game", class: "btn-a text-effect-dark" },
      "Start Game"
    );

  startContent.append(btnPvsC, btnPvsP, btnQuitGame, btnStartGame);
}

