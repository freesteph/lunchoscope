function formatMenu(data) {
  const all = [
    ["meat", ":poultry_leg:"],
    ["veg", ":green_salad:"],
    // ["sides", ":fries:"]
  ].map(([diet, emoji]) => {
    const entry = data[diet];

    return entry ? `${emoji} ${entry.description} - *${entry.price}*` : "";
  });

  return "Today's menu is:\n" + all.join("\n");
}

module.exports = formatMenu;
