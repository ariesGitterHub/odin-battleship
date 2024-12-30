const { ship } = require("../js/main.js");

//Reminder that it and test do the same thing.

const { Ship } = require("../js/main.js");

describe("Ship", () => {
  let ship5C;

  beforeEach(() => {
    // This will run before each test, creating a fresh instance of Ship
    ship5C = new Ship("Carrier", 5);
  });

  it("should initialize with correct name, length, numHits, and sunkStatus", () => {
    expect(ship5C.name).toBe("Carrier");
    expect(ship5C.length).toBe(5);
    expect(ship5C.numHits).toBe(0);
    expect(ship5C.sunkStatus).toBe(false);
  });

  it("should increment numHits when hit is called", () => {
    ship5C.hit();
    expect(ship5C.numHits).toBe(1);

    ship5C.hit();
    expect(ship5C.numHits).toBe(2);
  });

  it("should not allow numHits to exceed the ship's length", () => {
    ship5C.hit();
    ship5C.hit();
    ship5C.hit();
    ship5C.hit();
    ship5C.hit(); // The 5th hit, the ship should be "full"

    // One more hit should not increase numHits beyond 5
    ship5C.hit();
    expect(ship5C.numHits).toBe(5);
  });

  it("should determine if the ship is sunk based on numHits", () => {
    expect(ship5C.isSunk()).toBe(false);

    // Simulate hits
    ship5C.hit();
    ship5C.hit();
    ship5C.hit();
    ship5C.hit();
    ship5C.hit(); // The ship has now been hit 5 times

    expect(ship5C.isSunk()).toBe(true);
  });
});
