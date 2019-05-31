const DAYS = require("./data/days");

const unspace = str => str.replace(/\s{2,}/g, " ");

const removeJunk = str => {
  const tokens = [
    new RegExp(DAYS.concat("Weekly menu").join("|"), "ig"), // days
    new RegExp("[\\w]{15,}", "ig"), // longass words
    new RegExp("\\s[A-Z]{2}\\s"), // double capitals
    new RegExp("WC:[\\d\\w]{4}\\s\\w+") // WC preambule
  ];

  return tokens.reduce((sane, reg) => sane.replace(reg, ""), str);
};

function parseDayInput(day, input) {
  const index = DAYS.indexOf(day);
  const entryRegexp = /(.+?)(£\s?\d\.\d{2})/g;

  const sane = input.split("\n").join("");
  const all = unspace(sane).split("LUNCHOSCOPE_DELIM");

  const res = ["meat", "veg", "sides"].reduce((menu, diet, i) => {
    const entries = [];

    let match;
    while ((match = entryRegexp.exec(all[i]))) {
      entries.push(match);
    }

    if (!entries.length) return {};

    const dayEntry = entries[index * 2];

    if (!dayEntry) return menu;

    return {
      ...menu,
      [diet]: {
        description: removeJunk(dayEntry[1]),
        price: dayEntry[2]
      }
    };
  }, {});

  return res;
}

module.exports = function mapper(input) {
  return DAYS.reduce(
    (menu, currentDay) => ({
      ...menu,
      [currentDay]: parseDayInput(currentDay, input)
    }),
    {}
  );
};
