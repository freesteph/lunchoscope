const lunchoscope = require("./index");
const fs = require("fs");
const fetch = require("node-fetch");

function refresh() {
  const [, , url] = process.argv;

  if (!url) throw new Error("no URL provided for the refresh");

  fetch(url, {
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  })
    .then(res => res.buffer())
    .then(body => {
      if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");

      fs.writeFileSync("./tmp/menu-image.jpg", body);
      const parsed = lunchoscope("./tmp/menu-image.jpg");

      fs.writeFileSync("./tmp/menu", JSON.stringify(parsed, null, 2));
    });
}

refresh();

module.exports = refresh;
