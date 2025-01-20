import { createElement, createImg } from "./basicFunctions.js";
import broadside from "../assets/broadside1.gif";
export function createStartContentElements() {
const startContent = document.querySelector("#start-content");
const btnPvsC = createElement(
  "button",
  { id: "btn-pvsc", class: "btn" },
  "Player One vs Computer"
);

const btnPvsP = createElement(
  "button",
  { id: "btn-pvsp", class: "btn" },
  "Player One vs Player Two"
);

const gifContainer = createElement(
  "div",
  { id: "gif-container" }
);

const battleshipGif = createImg({
  src: broadside,
  alt: "A destroyer fires a massive broadside during World War II",
  class: "gif",
});

startContent.append(gifContainer, btnPvsC, btnPvsP);
gifContainer.appendChild(battleshipGif);
}

