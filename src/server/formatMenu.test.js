const formatMenu = require("./formatMenu");

const mockData = {
  meat: { description: "chicken", price: "3" },
  veg: { description: "spinash", price: "2" },
  sides: { description: "fries & gravy", price: "1" }
};

describe("formatMenu", () => {
  it("should format the menu entry properly", () => {
    expect(formatMenu(mockData)).toMatchSnapshot();
  });
});
