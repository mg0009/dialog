const express = require("express");
const app = express();

// yahi tum control karoge
let MESSAGE = "hello";

// test route
app.get("/", (req, res) => {
  res.send("SERVER OK");
});

// app yahan se message lega
app.get("/get-msg", (req, res) => {
  res.send(MESSAGE);
});

// browser se change kar sakte ho
app.get("/set-msg", (req, res) => {
  const msg = req.query.msg;

  if (msg && msg.trim() !== "") {
    MESSAGE = msg.trim();
    res.send("Updated: " + MESSAGE);
  } else {
    res.send("No message");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
