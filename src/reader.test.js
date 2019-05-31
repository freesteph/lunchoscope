const reader = require("./reader");

describe("reader", () => {
  let result;

  beforeAll(() => {
    result = reader("test/sampleMenu.jpg");
  });

  it("should parse the menu correctly", () => {
    expect(result).toMatchSnapshot();
  });
});
