// const { Ship } = require("../js/ship.js");
import { Ship } from "../js/classShip.js";

//Reminder that it and test do the same thing.

describe("Ship", () => {
  let c5;

  beforeEach(() => {
    // This will run before each test, creating a fresh instance of Ship
    c5 = new Ship("Carrier", 5);
  });

  it("should initialize with correct name, length, numHits, and sunkStatus", () => {
    expect(c5.name).toBe("Carrier");
    expect(c5.length).toBe(5);
    expect(c5.numHits).toBe(0);
    expect(c5.sunkStatus).toBe(false);
  });

  it("should increment numHits when hit is called", () => {
    c5.hit();
    expect(c5.numHits).toBe(1);

    c5.hit();
    expect(c5.numHits).toBe(2);
  });

  it("should not allow numHits to exceed the ship's length", () => {
    c5.hit();
    c5.hit();
    c5.hit();
    c5.hit();
    c5.hit(); // The 5th hit, the ship should be "full"

    // One more hit should not increase numHits beyond 5
    c5.hit();
    expect(c5.numHits).not.toBe(6);
  });

  it("should determine if the ship is sunk based on numHits", () => {
    expect(c5.isSunk()).toBe(false);

    // Simulate hits
    c5.hit();
    c5.hit();
    c5.hit();
    c5.hit();
    c5.hit(); // The ship has now been hit 5 times

    expect(c5.isSunk()).toBe(true);
    expect(c5.isSunk()).toBe(true); // tests line 36 of ship.js
  });
});
