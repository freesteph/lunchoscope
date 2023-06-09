const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const getMenu = require("./getMenu");

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post("/", getMenu);

app.get("/hk", (req, res) => {
  res.status(200).end();
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("server started");
});
