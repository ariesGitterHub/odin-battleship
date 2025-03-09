import { createElement, createImg } from "./functionTemplates.js";
import { getHeaderElements } from "./domQueries.js";
import gifBroadside1 from "../assets/gifBroadside1.gif";

export function createHeader() {
  const { header } = getHeaderElements();
  const titleContainer = createElement("div", {
    id: "title-container",
  });
  const titleTextTop = createElement(
    "p",
    {
      id: "title-text-top",
      class: "font-fancy text-effect-dark",
    },
    "Battleship:"
  );
  const titleTextBot = createElement(
    "p",
    {
      id: "title-text-bot",
      class: "font-fancy text-effect-dark",
    },
    "World War II"
  );
  const MMM = createElement(
    "p",
    {
      id: "MMM",
      class: "font-fancy text-effect-dark",
    },
    "Mad Muffin Man Design Studio, ©2025"
  );
  const gifContainer = createElement("div", {
    id: "gif-container",
  });
  const battleshipGif = createImg({
    id: "battleship-gif",
    src: gifBroadside1,
    alt: "A destroyer fires a massive broadside during World War II",
    class: "gif",
  });
  header.append(titleContainer, gifContainer);
  titleContainer.append(titleTextTop, titleTextBot);
  titleContainer.appendChild(MMM);
  gifContainer.appendChild(battleshipGif);
}
