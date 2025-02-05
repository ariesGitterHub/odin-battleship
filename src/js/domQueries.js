// REMOVE UNUSED SELECTORS!!!!
export function getHeaderElements() {
  return {
    header: document.querySelector("#header"),
    titleContainer: document.querySelector("#title-container"),
    titleText: document.querySelector("#title-text"),
    MMM: document.querySelector("#MMM"),
    gifContainer: document.querySelector("#gif-container"),
    battleshipGif: document.querySelector(".gif"),
  };
}

export function getMessageElements() {
  return {
    messages: document.querySelector("#messages"),
    messageBar: document.querySelector("#message-bar"),
  };
}

export function getBtnElements() {
  return {
    mainBtnContainer: document.querySelector("#main-btn-container"),
  };
}

export function getBoardElements() {
  return {
    p1BtnContainer: document.querySelector("#p1-btn-container"),
    p2BtnContainer: document.querySelector("#p2-btn-container"),
  };
}
