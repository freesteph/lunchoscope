const express = require("express");
const fs = require("fs");
const app = express();

app.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./tmp/menu"));
  res.json({
    text: data["Tuesday"]
  });
});

app.get("/hk", (req, res) => {
  res.status(200).end();
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("server started");
});
