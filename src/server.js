const express = require("express");

const app = express();

app.post("/", (req, res) => {
  const { command, text } = req.body;

  res.json({
    text: "Everything is working forever"
  });
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("server started");
});
