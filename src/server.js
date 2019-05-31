const express = require("express");
const fs = require("fs");
const app = express();

app.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./tmp/menu"))["Tuesday"];

  const all = [
    ["meat", ":poultry_leg:"],
    ["veg", ":green_salad:"],
    ["sides", ":fries:"]
  ].map(([diet, emoji]) => {
    const entry = data[diet];

    return entry ? `${emoji} ${entry.description} - *${entry.price}*`: '';
  });

  res.json({
    text: "Today's menu is: \n"+ all.join("\n"),
  });
});

app.get("/hk", (req, res) => {
  res.status(200).end();
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("server started");
});
