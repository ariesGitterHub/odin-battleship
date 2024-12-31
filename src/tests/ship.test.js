const { Ship } = require("../js/ship.js");

//Reminder that it and test do the same thing.

describe("Ship", () => {
  let shipC5;

  beforeEach(() => {
    // This will run before each test, creating a fresh instance of Ship
    shipC5 = new Ship("Carrier", 5);
  });

  it("should initialize with correct name, length, numHits, and sunkStatus", () => {
    expect(shipC5.name).toBe("Carrier");
    expect(shipC5.length).toBe(5);
    expect(shipC5.numHits).toBe(0);
    expect(shipC5.sunkStatus).toBe(false);
  });

  it("should increment numHits when hit is called", () => {
    shipC5.hit();
    expect(shipC5.numHits).toBe(1);

    shipC5.hit();
    expect(shipC5.numHits).toBe(2);
  });

  it("should not allow numHits to exceed the ship's length", () => {
    shipC5.hit();
    shipC5.hit();
    shipC5.hit();
    shipC5.hit();
    shipC5.hit(); // The 5th hit, the ship should be "full"

    // One more hit should not increase numHits beyond 5
    shipC5.hit();
    expect(shipC5.numHits).toBe(5);
  });

  it("should determine if the ship is sunk based on numHits", () => {
    expect(shipC5.isSunk()).toBe(false);

    // Simulate hits
    shipC5.hit();
    shipC5.hit();
    shipC5.hit();
    shipC5.hit();
    shipC5.hit(); // The ship has now been hit 5 times

    expect(shipC5.isSunk()).toBe(true);
  });
});
