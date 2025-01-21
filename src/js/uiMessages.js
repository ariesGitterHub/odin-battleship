import { createElement } from "./basicFunctions.js";

export function createMessageElements() {
  const messages = document.querySelector("#messages");
  const messageBar = createElement("div", {
    id: "message-bar",
    class: "text-effect-light",
  });

  
  messages.append(messageBar);
}

export function addMessage(msg) {
  const messageBar = document.querySelector("#message-bar");
  messageBar.innerText = msg;
}

export function clearMessage() {
  const messageBar = document.querySelector("#message-bar");
  messageBar.innerText = "";
}