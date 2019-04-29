const cp = require("child_process");

const IM_PARAMS = {
  resample: "300x300",
  border: "10x10",
  "brightness-contrast": "-20x80",
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

  cp.execSync(`convert ${path} ${params} ./tmp/output.tiff`);
  const text = cp.execSync(`tesseract ./tmp/output.tiff stdout`);

  return text.toString();
}

module.exports = reader;
