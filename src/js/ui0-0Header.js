import { createElement, createImg } from "./basicFunctionTemplates.js";
import broadside from "../assets/broadside1.gif";

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

    const gifContainer = createElement("div", { id: "gif-container" });

    const battleshipGif = createImg({
      src: broadside,
      alt: "A destroyer fires a massive broadside during World War II",
      class: "gif",
    });

  header.append(titleContainer, gifContainer);
  titleContainer.appendChild(titleText);
  titleContainer.appendChild(MMM);
  gifContainer.appendChild(battleshipGif);
}
