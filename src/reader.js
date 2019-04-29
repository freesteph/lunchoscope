const cp = require("child_process");

const IM_PARAMS = {
  resample: 144,
  fill: "black",
  opaque: "None",
  "auto-threshold": "OTSU",
  "auto-gamma": true,
  "auto-level": true,
  border: "1%",
  colorspace: "gray",
  normalize: true,
  monochrome: true,
  alpha: "off"
};

function formatIMParams(params) {
  return params
    .map(
      ([param, value]) =>
        value && value === true ? `-${param}` : `-${param} ${value}`
    )
    .filter(f => !!f)
    .join(" ");
}

function reader(path) {
  const params = formatIMParams(Object.entries(IM_PARAMS));

  cp.execSync(`convert ${path} ${params} ./tmp/output.png`);
  const text = cp.execSync(`tesseract ./tmp/output.png stdout`);

  return text.toString();
}

module.exports = reader;
