const getMenu = require("./getMenu");
const getDay = require("./getDay");

jest.mock("./getDay");

const mockRes = {
  text: jest.fn()
};

describe("getMenu", () => {
  const get = day => getMenu({ params: { day } }, mockRes);

  beforeEach(() => {
    getDay.mockReturnValue("menu");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a friendly error message if requested day isn't right", () => {
    expect(() => get("yolo")).toThrow(/not a day/);
  });

  it("should return the correct day's menu", () => {
    get("monday");

    expect(getDay).toHaveBeenCalledWith("monday");
    expect(mockRes.text).toHaveBeenCalledWith("menu");
  });
});
