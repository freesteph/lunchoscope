const DAYS = require("./data/days");

const unspace = str => str.replace(/\s{2,}/g, " ");

const removeJunk = str => {
  const tokens = [
    new RegExp(DAYS.concat("Weekly menu").join("|"), "ig"), // days
    new RegExp("[\\w]{15,}", "ig"), // longass words
    new RegExp("\\s[A-Z]{2}\\s"), // double capitals
    new RegExp("WC:[\\d\\w]{4}\\s\\w+"), // WC preambule
    new RegExp("Bank Holiday", "i")
  ];

  return tokens.reduce((sane, reg) => sane.replace(reg, ""), str);
};

const entryRegexp = /(.+?)(£\s?\d\.\d{2})/g;

const isDayMoot = (day, input) => {
  const index = DAYS.indexOf(day);

  const sane = input.split("\n").join("");

  const meat = unspace(sane).split("LUNCHOSCOPE_DELIM")[0];
  const sub = new RegExp(`${day}(.*)${DAYS[index + 1] || "$"}`, "i");
  const scoped = meat.match(sub)[0]; // with-day, meat input

  return !entryRegexp.test(scoped);
};

function parseDayInput(day, input, mootDays) {
  const index = DAYS.indexOf(day);

  const all = unspace(input)
    .split("LUNCHOSCOPE_DELIM")
    .map(s =>
      unspace(s)
        .split("\n")
        .join(" ")
    )
    .slice(0, 2);

  const res = ["meat", "veg"].reduce((menu, diet, i) => {
    entryRegexp.lastIndex = 0;
    let entries = [];

    let match;

    while ((match = entryRegexp.exec(all[i]))) {
      entries.push(match);
    }

    const dayEntry = entries[1 * index - mootDays];

    if (!dayEntry) return menu;

    return {
      ...menu,
      [diet]: {
        description: removeJunk(dayEntry[1]).trim(),
        price: dayEntry[2]
      }
    };
  }, {});

  return res;
}

module.exports = function mapper(input) {
  let mootDays = 0;

  return DAYS.reduce((menu, currentDay) => {
    if (isDayMoot(currentDay, input)) {
      mootDays++;

      return {
        ...menu,
        [currentDay]: "N/A"
      };
    } else {
      return {
        ...menu,
        [currentDay]: parseDayInput(currentDay, input, mootDays)
      };
    }
  }, {});
};
