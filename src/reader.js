const cp = require("child_process");

const IM_PARAMS = {
  resize: "x1000",
  fill: "black",
  level: "-15%,100%,0.2",
  opaque: "None",
  "+repage": true,
  crop: "3x1+5@",
  "+adjoin": true,
  "auto-threshold": "OTSU",
  "auto-gamma": true,
  "auto-level": true,
  colorspace: "Gray",
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

  return [0, 1, 2]
    .map(n => cp.execSync(`tesseract ./tmp/output-${n}.png stdout`))
    .join("LUNCHOSCOPE_DELIM");
}

module.exports = reader;
