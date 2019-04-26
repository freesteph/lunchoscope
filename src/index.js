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

function lunchoscope() {
  const params = Object.entries(IM_PARAMS)
    .map(
      ([param, value]) =>
        value && value === true ? `-${param}` : `-${param} ${value}`
    )
    .filter(f => !!f)
    .join(" ");

  cp.execSync(`convert current-menu.jpg ${params} output.tiff`);
  const text = cp.execSync(`tesseract output.tiff stdout`);

  return text.toString();
}

module.exports = lunchoscope;
