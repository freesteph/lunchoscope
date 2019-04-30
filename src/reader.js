const cp = require("child_process");

const IM_PARAMS = {
  resample: 200,
  filter: "triangle",
  resize: "x1000",
  fill: "black",
  opaque: "None",
  crop: "3x0@",
  border: "3%",
  "+repage": true,
  "+adjoin": true,
  "auto-threshold": "OTSU",
  "auto-gamma": true,
  "auto-level": true,
  colorspace: "gray",
  normalize: true,
  monochrome: true,
  alpha: "off"
};

function formatIMParams(params) {
  return params
    .map(
      ([param, value]) =>
        value && value === true
          ? param.startsWith("+")
            ? param
            : `-${param}`
          : `-${param} ${value}`
    )
    .filter(f => !!f)
    .join(" ");
}

function reader(path) {
  const params = formatIMParams(Object.entries(IM_PARAMS));

  cp.execSync(`convert ${path} ${params} ./tmp/output.png`);
  const text = [0, 1, 2]
    .map(n => cp.execSync(`tesseract ./tmp/output-${n}.png stdout`))
    .join("");

  return text.toString();
}

module.exports = reader;
