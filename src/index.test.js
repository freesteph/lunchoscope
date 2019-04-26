const lunchoscope = require("./index");

describe("lunchoscope", () => {
  it("should correctly read the entries", () => {
    const entries = [
      "Pea and mint",
      "Greek salad with watermelon",
      "Beef steak chilli served with coriander",
      "Grilled oregano halloumi",
      "with fluffy chips, home made tartare sauce"
    ];

    const result = lunchoscope()
      .split("\n")
      .filter(v => !!v);

    expect(result).toEqual(expect.arrayContaining(entries));
  });
});
