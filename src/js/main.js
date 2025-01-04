import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";


let seaBoard = Array(10).fill().map(() => Array(10).fill('--'));
// let myShips = [
//     new Ship("aircraft carrier", 5, "c5"),
//     new Ship("battleship", 4, "b4"),
//     new Ship("destroyer", 3, "d3"),
//     new Ship("submarine", 3, "s3"),
//     new Ship("patrol boat", 2, "p2")
// ]
const testGame = new Gameboard(seaBoard
    // , myShips
);

// console.log(testGame);

//const d3 = new Ship("destroyer", 3, "d3");
 testGame.placeShip(testGame.ships[0], "v", 1, 7);
 console.log(testGame.ships[0]);
 testGame.placeShip(testGame.ships[1], "v", 2, 0);
 testGame.placeShip(testGame.ships[2], "h", 3, 2);
 testGame.placeShip(testGame.ships[3], "v", 5, 5);
 testGame.placeShip(testGame.ships[4], "h", 8, 7);

 testGame.receiveAttack(0, 0);
 testGame.receiveAttack(1, 7);
 testGame.receiveAttack(2, 7);
 testGame.receiveAttack(3, 7);
 testGame.receiveAttack(4, 7);
 testGame.receiveAttack(5, 7);

// console.log(seaBoard);
console.log(testGame.ships[0]);
console.log(testGame.ships[0].numHits);
console.log(testGame.ships[0].isSunk());
console.log(testGame.ships[0]);

// console.log(d3);
// d3.hit();
// d3.hit();
// d3.hit();
// d3.hit();
// console.log(d3.isSunk());
// console.log(d3);



console.log(seaBoard)
