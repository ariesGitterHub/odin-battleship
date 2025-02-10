import { createElement } from "./functionTemplates.js";
import { getMessageElements } from "./domQueries.js";

export function createMessageElements() {
  const { messages } = getMessageElements();
  const messageBar = createElement("div", {
    id: "message-bar",
    class: "text-effect-light",
  });
  messages.append(messageBar);
}