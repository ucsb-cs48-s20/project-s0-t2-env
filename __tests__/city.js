import { numberWithCommas } from "../utils/numbers.js";

describe("pages/cities/[city].js", () => {
  describe("numberWithCommas", () => {
    it("converts 2472471 to 2,472,471", () => {
      expect(numberWithCommas(2472471)).toBe("2,472,471");
    });
    it("converts 471 to 471", () => {
      expect(numberWithCommas(471)).toBe("471");
    });
    it("converts 2472471.23214 to 2,472,471", () => {
      expect(numberWithCommas(2472471.23214)).toBe("2,472,471");
    });
  });
});
