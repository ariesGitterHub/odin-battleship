/**
 * Creates an HTML element with specified attributes and optional inner content.
 * @param {string} tagName - The type of element to create (e.g., 'div', 'span', 'p').
 * @param {Object} [attributes={}] - An object of attributes to apply to the element.
 * @param {string|HTMLElement} [innerContent=''] - Optional inner content (text or HTML).
 * @returns {HTMLElement} The created element.
 */

export function createElement(tagName, attributes = {}, text = "") {
  const element = document.createElement(tagName);
  // Set attributes dynamically
  for (const [key, value] of Object.entries(attributes)) {
    // Handle 'class' special case (className is the property used in JS)
    if (key === "class") {
      element.className = value;
    } else if (key.startsWith("data-")) {
      element.setAttribute(key, value); // For 'data-*' attributes
    } else {
      element.setAttribute(key, value);
    }
  }
  // Set inner content if provided
  if (text) {
    element.innerText = text; // Could also use innerText if you want plain text
  }
  return element;
}

// Examples --> KEEP THESE COMMENTS FOR REFERENCE
// Creating a div with id and class
// const div = createElement('div', { id: 'my-div', class: 'container' });
// document.body.appendChild(div);

// // Creating a button with text content
// const button = createElement('button', { id: 'submit-button', class: 'btn' }, 'Submit');
// document.body.appendChild(button);

// // Creating an element with data attributes
// const dataElement = createElement('div', { 'data-role': 'admin', class: 'user' });
// document.body.appendChild(dataElement);

// // Creating a paragraph with HTML content
// const paragraph = createElement('p', {}, '<strong>Hello</strong>, world!');
// document.body.appendChild(paragraph);

/**
 * Creates an HTML image element with specified attributes.
 * @param {Object} attributes - An object of attributes to apply to the image element.
 * @returns {HTMLImageElement} The created image element.
 */

export function createImg(attributes = {}) {
  const img = document.createElement("img");
  // Set attributes dynamically
  for (const [key, value] of Object.entries(attributes)) {
    // Handle 'id', 'src', and 'alt' attributes specifically
    if (key === "id") {
      img.id = value;
    } else if (key === "src") {
      img.src = value;
    } else if (key === "alt") {
      img.alt = value;
    } else if (key.startsWith("data-")) {
      // Special case for data-* attributes (e.g., data-selected)
      img.setAttribute(key, value);
    } else {
      img.setAttribute(key, value);
    }
  }
  return img;
}

// Examples --> KEEP THESE COMMENTS FOR REFERENCE
// import { createImg } from "./basicFunctions.js";

// // Create an image with src, alt, and class attributes
// const myImage = createImg({
//   id: "image-id",
//   src: "path/to/your/image.png",
//   alt: "Description of the image",
//   class: "game-marker",
// });

// // Append the image to the document body
// document.body.appendChild(myImage);

export function createImgShip(id, selectShip, src, classes) {
  if (selectShip === "a") {
    const a = createImg({
      id: id,
      src: src,
      alt: "aircraft carrier image",
      "data-ship": "a",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return a;
  }
  if (selectShip === "b") {
    const b = createImg({
      id: id,
      src: src,
      alt: "battleship image",
      "data-ship": "b",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return b;
  }
  if (selectShip === "d") {
    const d = createImg({
      id: id,
      src: src,
      alt: "destroyer image",
      "data-ship": "d",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return d;
  }
  if (selectShip === "s") {
    const s = createImg({
      id: id,
      src: src,
      alt: "submarine image",
      "data-ship": "s",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return s;
  }
  if (selectShip === "c") {
    const c = createImg({
      id: id,
      src: src,
      alt: "corvette image",
      "data-ship": "c",
      "data-axis": "h",
      "data-selected": "",
      class: classes,
    });
    return c;
  }
  // if (selectShip === "p") {
  //   const p = createImg({
  //     id: id,
  //     src: src,
  //     alt: "corvette image",
  //     "data-ship": "p",
  //     "data-axis": "h",
  //     "data-selected": "",
  //     class: classes,
  //   });
  //   return p;
  // }
}
