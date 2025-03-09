class Ship {
  constructor(
    name,
    length,
    boardCode,
    boardHitCode,
    numHits = 0,
    sunkStatus = false
  ) {
    (this.name = name),
      (this.length = length),
      (this.boardCode = boardCode),
      (this.boardHitCode = boardHitCode);
    (this.numHits = numHits), (this.sunkStatus = sunkStatus);
  }

  hit() {
    if (this.numHits < this.length) {
      this.numHits += 1;
    }
  }

  isSunk() {
    if (this.numHits >= this.length) {
      if (!this.sunkStatus) {
        this.sunkStatus = true;
      }
      return true;
    }
    return false;
  }

  clearHitsAndSunkStatus() {
    if (this.numHits > 0) {
      this.numHits = 0;
    }
    if (this.sunkStatus) {
      this.sunkStatus = false;
    }
  }
}

export { Ship };
