const days = require("../data/days");
const getDay = require("./getDay");
const formatMenu = require("./formatMenu");

function getMenu(req, res) {
  const day = req.body.day.toLowerCase();

  if (!days.includes(day)) {
    throw new Error("not a day I'm aware of.");
  }

  res.send(formatMenu(getDay(day)));
}

module.exports = getMenu;
