import { createElement, createImg } from "./basicFunctions.js";
import compass from "../assets/compass.svg";

export function createPlaceShipsElements() {
    const p1PlaceShips = document.querySelector("#p1-place-ships");
    const p1Compass = document.querySelector("#p1-compass");
    const p1X5Grid = document.querySelector("#p1-x5-grid");

      const imgCompass = createImg({
        src: compass,
        alt: "circle element",
        class: "circle",
      });

      
}