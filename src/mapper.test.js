const data = require("../test/sampleOutput");
const mapper = require("./mapper");

describe("mapper", () => {
  it("returns an object keyed by days", () => {
    expect(Object.keys(mapper(data))).toEqual([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday"
    ]);
  });

  it.skip("has the correct value for monday", () => {
    const monday = mapper(data)["monday"];

    expect(monday.veg.description).toEqual(
      expect.stringContaining(
        "Lime, lemongrass and basil scented Thai green curry, chunky courgettes, bean sprouts and & butter beans with coriander rice"
      )
    );
  });

  it("has the correct price value for monday", () => {
    const monday = mapper(data)["monday"];

    expect(monday.veg.price).toEqual("£3.60");
  });
});
