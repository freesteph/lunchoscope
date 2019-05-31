const getMenu = require("./getMenu");
const getDay = require("./getDay");
const formatMenu = require("./formatMenu");

jest.mock("./getDay");
jest.mock("./formatMenu");

const mockRes = {
  send: jest.fn()
};

describe("getMenu", () => {
  const get = day => getMenu({ body: { day } }, mockRes);

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
    expect(mockRes.send).toHaveBeenCalledWith("formatted menu");
  });
});
