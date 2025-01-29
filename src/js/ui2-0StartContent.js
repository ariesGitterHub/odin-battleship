import { createElement, createImg } from "./basicFunctionTemplates.js";
import broadside from "../assets/broadside1.gif";
import compass from "../assets/compass.svg";
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

  const gifContainer = createElement("div", { id: "gif-container" });

  const battleshipGif = createImg({
    src: broadside,
    alt: "A destroyer fires a massive broadside during World War II",
    class: "gif",
  });

  // const imgCompass = createImg({
  //   src: compass,
  //   alt: "Description of the image",
  //   class: "circle",
  // });

  startContent.append(gifContainer, btnPvsC, btnPvsP);
  gifContainer.appendChild(battleshipGif);
  // startContent.append(imgCompass);
}

