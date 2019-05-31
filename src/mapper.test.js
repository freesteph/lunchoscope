const data = require("../test/sampleOutput");
const mapper = require("./mapper");

describe("mapper", () => {
  it("correctly maps all days", () => {
    expect(mapper(data)).toMatchSnapshot();
  });
});
