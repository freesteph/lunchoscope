const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

module.exports = function mapper(input) {
  const inlined = input.split("\n").filter(v => !!v);

  return DAYS.reduce((menu, currentDay) => {
    const day = DAYS.indexOf(currentDay);
    const from = input.indexOf(currentDay) + currentDay.length;
    const to = currentDay !== "Friday" && input.indexOf(DAYS[day + 1]);

    const data = input.slice(from, to === false ? undefined : to);

    return Object.assign({}, menu, {
      [currentDay]: data
    });
  }, {});
};
