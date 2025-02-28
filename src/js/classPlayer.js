// There will be two types of players in the game, ‘real’ players and ‘computer’ players.
// Each player object should contain its own gameboard.

// Import your classes/factories into another file, and drive the game using event listeners to interact with your objects. Create a module that helps you manage actions that should happen in the DOM. SO HEAD OVER TO MAIN.JS and get busy.

// import { Gameboard } from "./gameboard.js";

class Player {
  //   constructor(playerNum, playerType, playerBoard = new Gameboard()) {
  constructor(playerNum, playerType, playerBoard) {
    this.playerNum = playerNum; // playerOne or playerTwo
    this.playerType = playerType; // human or computer
    this.playerBoard = playerBoard;
  }
}

export { Player };