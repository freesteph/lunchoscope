const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./tmp/menu"));

function getDay(day) {
  return data[day];
}

module.exports = getDay;
