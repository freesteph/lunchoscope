const data = require("../test/sampleOutput");
const mapper = require("./mapper");

describe("mapper", () => {
  it("returns an object keyed by days", () => {
    expect(Object.keys(mapper(data))).toEqual([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ]);
  });

  it("has the correct value for Tuesday", () => {
    const monday = mapper(data)["Tuesday"];

    expect(monday).toEqual(expect.stringContaining("Beef steak chilli"));
    expect(monday).toEqual(expect.stringContaining("Vegan chilli & bean"));
    expect(monday).toEqual(expect.stringContaining("Crispy chilli courgettes"));

    expect(monday).not.toEqual("Dirty vegan");
  });
});
