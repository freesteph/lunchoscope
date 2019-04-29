const reader = require("./reader");

describe("reader", () => {
  it("should correctly read the entries", () => {
    result = reader("test/sampleMenu.jpg");

    const entries = [
      "Lime, lemongrass and basil scented Thai",
      "Hot smoked BBQ pork belly",
      "Kookoo Sabzi (Persian frittata)",
      "Homemade polenta cake with roasted",
      "Chicken Parmigiana with oregano"
    ];

    entries.forEach(entry =>
      expect(result).toEqual(expect.stringContaining(entry))
    );
  });
});
