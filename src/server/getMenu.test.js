const getMenu = require("./getMenu");
const getDay = require("./getDay");
const formatMenu = require("./formatMenu");

jest.mock("./getDay");
jest.mock("./formatMenu");

const mockRes = {
  text: jest.fn()
};

describe("getMenu", () => {
  const get = day => getMenu({ params: { day } }, mockRes);

  beforeEach(() => {
    getDay.mockReturnValue("menu");
    formatMenu.mockReturnValue("formatted menu");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a friendly error message if requested day isn't right", () => {
    expect(() => get("yolo")).toThrow(/not a day/);
  });

  it("should grab the correct day's menu", () => {
    get("monday");

    expect(getDay).toHaveBeenCalledWith("monday");
  });

  it("should return the resulting day's menu through the formatter", () => {
    get("monday");

    expect(formatMenu).toHaveBeenCalledWith("menu");
    expect(mockRes.text).toHaveBeenCalledWith("formatted menu");
  });
});
