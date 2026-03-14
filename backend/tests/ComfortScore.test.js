import calculateComfortScore from "../ComfortScore.js";

describe("Comfort Index Function", () => {

  test("returns a high score for comfortable weather", () => {
    const score = calculateComfortScore(298, 40, 3, 20);
    expect(score).toBeGreaterThan(70);
  });

  test("returns lower score for high humidity", () => {
    const score = calculateComfortScore(298, 90, 2, 20);
    expect(score).toBeLessThan(75);
  });

  test("returns lower score for extreme temperature", () => {
    const score = calculateComfortScore(320, 40, 3, 20);
    expect(score).toBeLessThan(65);
  });

  test("returns number between 0 and 100", () => {
    const score = calculateComfortScore(298, 40, 3, 20);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

});