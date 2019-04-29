const lunchoscope = require("./index");
const reader = require("./reader");
const mapper = require("./mapper");

jest.mock("./reader");
jest.mock("./mapper");

const mockReadResult = Symbol("test-read-result");
const mockMapperResult = Symbol("test-mapper-result");
const mockPath = Symbol("test-path");

describe("lunchoscope", () => {
  beforeEach(() => {
    reader.mockReturnValue(mockReadResult);
    mapper.mockReturnValue(mockMapperResult);
  });

  it("should call the reader with the right path", () => {
    lunchoscope(mockPath);

    expect(reader).toHaveBeenCalledWith(mockPath);
  });

  it("should pipe the result to the mapper", () => {
    lunchoscope(mockPath);

    expect(mapper).toHaveBeenCalledWith(mockReadResult);
  });

  it("should return the mapper's result", () => {
    expect(lunchoscope(mockPath)).toEqual(mockMapperResult);
  });
});
