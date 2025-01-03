it.skip("should increment numHits when hit is called", () => {
  shipC5.hit();
  expect(shipC5.numHits).toBe(1);

  shipC5.hit();
  expect(shipC5.numHits).toBe(2);
});
