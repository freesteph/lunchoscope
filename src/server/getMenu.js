const days = require("../data/days");
const getDay = require("./getDay");
const formatMenu = require("./formatMenu");

function getMenu(req, res) {
  console.log("req.params is: ", req.params);
  console.log("req.body is: ", req.body);

  const day = req.body.text.toLowerCase();

  if (!days.includes(day)) {
    throw new Error("not a day I'm aware of.");
  }

  res.send(formatMenu(getDay(day)));
}

module.exports = getMenu;
