const express = require("express");

const app = express();

app.post("/", (req, res) => {
  res.json({
    text: "Everything is working forever"
  });
});

app.get("/hk", (req, res) => {
  res.status(200).end();
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("server started");
});
