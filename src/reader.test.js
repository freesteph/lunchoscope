const reader = require("./reader");

describe("reader", () => {
  let result;

  beforeAll(() => {
    result = reader("test/sampleMenu.jpg");
  });

  describe("tokens", () => {
    it.each([
      "Lime, lemongrass and basil scented Thai",
      "Hot smoked BBQ pork belly",
      "Kookoo Sabzi (Persian frittata)",
      "Homemade polenta cake with roasted",
      "Chicken Parmigiana with oregano"
    ])("should parse the %p", entry => {
      expect(result).toEqual(expect.stringContaining(entry));
    });
  });

  describe("days", () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    it.each(days)(`should recognise %p`, day => {
      expect(result).toEqual(expect.stringContaining(day));
    });
  });
});
