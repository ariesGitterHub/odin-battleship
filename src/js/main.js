import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";


let seaBoard = Array(10).fill().map(() => Array(10).fill('?'));
let myShips = [
    new Ship("aircraft carrier", 5, "c5"),
    new Ship("battleship", 4, "b4"),
    new Ship("destroyer", 3, "d3"),
    new Ship("submarine", 3, "s3"),
    new Ship("patrol boat", 2, "p2")
]
const testGame = new Gameboard(seaBoard, myShips);

// console.log(testGame);

//const d3 = new Ship("destroyer", 3, "d3");
testGame.placeShip(testGame.ships[2], "v", 0, 0); 
testGame.placeShip(testGame.ships[0], "h", 0, 9)
// console.log(seaBoard);
// console.log(testGame.ships[2]);

// console.log(d3);
// d3.hit();
// d3.hit();
// d3.hit();
// d3.hit();
// console.log(d3.isSunk());
// console.log(d3);



console.log(seaBoard)
