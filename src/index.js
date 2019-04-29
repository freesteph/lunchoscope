const mapper = require("./mapper");
const reader = require("./reader");

function lunchoscope(path) {
  return mapper(reader(path));
}

module.exports = lunchoscope;
