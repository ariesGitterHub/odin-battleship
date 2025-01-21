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


// Examples
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
    // Handle 'src' and 'alt' attributes specifically
    if (key === "src") {
      img.src = value;
    } else if (key === "alt") {
      img.alt = value;
    } else {
      img.setAttribute(key, value);
    }
  }

  return img;
}


// import { createImg } from "./basicFunctions.js";

// // Create an image with src, alt, and class attributes
// const myImage = createImg({
//   src: "path/to/your/image.png",
//   alt: "Description of the image",
//   class: "game-marker",
// });

// // Append the image to the document body
// document.body.appendChild(myImage);
