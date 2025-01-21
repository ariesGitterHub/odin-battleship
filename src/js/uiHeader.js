import { createElement } from "./basicFunctions.js";

export function createHeader() {
  const header = document.querySelector("#header");

  const titleContainer = createElement("div", {
    id: "title-container",
    // class: "flex-col",
  });

  const titleText = createElement(
    "p",
    {
      id: "title-text",
      class: "font-fancy text-effect-dark",
    },
    "Battleship: World War II"
  );

  const MMM = createElement(
    "p",
    {
      id: "MMM",
      class: "font-fancy text-effect-dark",
    },
    "A Mad Muffin Man Design Studio, ©2025"
  );

  header.appendChild(titleContainer);
  titleContainer.appendChild(titleText);
  titleContainer.appendChild(MMM);
}
