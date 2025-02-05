import { createElement } from "./basicFunctionTemplates.js";
import { getMessageElements } from "./domQueries.js";

export function createMessageElements() {
  const { messages } = getMessageElements();
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
