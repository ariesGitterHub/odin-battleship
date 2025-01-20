export function createMessages(msg) {
  const messages = document.querySelector("#messages");
  const messageBar = document.createElement("div");
  messageBar.textContent = msg
  messages.appendChild(messageBar)
}