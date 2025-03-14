import { Ship } from "../js/classShip.js";

//Reminder that "it" and "test" do the same thing.

describe("Ship", () => {
  let ac5;

  beforeEach(() => {
    // This will run before each test, creating a fresh instance of Ship
    ac5 = new Ship("aircraft-carrier", 5);
  });

  it("should initialize with correct name, length, numHits, and sunkStatus", () => {
    expect(ac5.name).toBe("aircraft-carrier");
    expect(ac5.length).toBe(5);
    expect(ac5.numHits).toBe(0);
    expect(ac5.sunkStatus).toBe(false);
  });

  it("should increment numHits when hit is called", () => {
    ac5.hit();
    expect(ac5.numHits).toBe(1);

    ac5.hit();
    expect(ac5.numHits).toBe(2);
  });

  it("should not allow numHits to exceed the ship's length", () => {
    ac5.hit();
    ac5.hit();
    ac5.hit();
    ac5.hit();
    ac5.hit(); // The 5th hit, the ship should be "full"

    // One more hit should not increase numHits beyond 5
    ac5.hit();
    expect(ac5.numHits).not.toBe(6);
  });

  it("should determine if the ship is sunk based on numHits", () => {
    expect(ac5.isSunk()).toBe(false);

    // Simulates hits
    ac5.hit();
    ac5.hit();
    ac5.hit();
    ac5.hit();
    ac5.hit(); // The ship has now been hit 5 times

    expect(ac5.isSunk()).toBe(true);
    expect(ac5.isSunk()).toBe(true); // tests line 36 of ship.js
  });
});
