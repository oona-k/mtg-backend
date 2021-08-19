const express = require("express");

var cors = require("cors");

const app = express();

app.use(
  cors({
    allowedHeaders: { "Access-Control-Allow-Headers": "*" },
    origin: "*",
  })
);
app.listen(3001, () => console.log("Server listening at port 3001"));

const fileUrl =
  "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt";

app.get("/getrules", (req, res) => {
  const https = require("https");
  let myURL = new URL(fileUrl);
  let body = [];
  https
    .request(myURL, (response) => {
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => res.send(body.toString()));
    })
    .end();
});
