const mapper = require("./mapper");
const cp = require("child_process");

const IM_PARAMS = {
  density: 100,
  depth: 8,
  // "auto-gamma": true,
  // "auto-level": true,
  // enhance: true,
  // strip: true,
  noise: "1x1",
  border: "10x10",
  sharpen: 20,
  resample: "600x600",
  monochrome: true
};

function lunchoscope(path) {
  const params = Object.entries(IM_PARAMS)
    .map(
      ([param, value]) =>
        value && value === true ? `-${param}` : `-${param} ${value}`
    )
    .filter(f => !!f)
    .join(" ");

  cp.execSync(`convert ${path} ${params} ./tmp/output.tiff`);
  const text = cp.execSync(`tesseract ./tmp/output.tiff stdout`);

  return mapper(text.toString());
}

module.exports = lunchoscope;
