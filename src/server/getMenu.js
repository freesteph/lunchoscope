const days = require("../data/days");
const getDay = require("./getDay");
const formatMenu = require("./formatMenu");

function getMenu(req, res) {
  const { day } = req.params;

  if (!days.map(d => d.toLowerCase()).includes(day.toLowerCase())) {
    throw new Error("not a day I'm aware of.");
  }

  res.text(formatMenu(getDay(day)));
}

module.exports = getMenu;
