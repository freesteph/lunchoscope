const lunchoscope = require("./index");

describe("lunchoscope", () => {
  it("should correctly read the entries", () => {
    result = lunchoscope();

    const entries = [
      "Pea and mint",
      "Greek salad with watermelon",
      "Beef steak chilli served with coriander",
      "Grilled oregano halloumi",
      "with fluffy chips, home made tartare sauce"
    ];

    entries.forEach(entry =>
      expect(result).toEqual(expect.stringContaining(entry))
    );
  });
});
