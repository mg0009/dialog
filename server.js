const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Dynamic values (persist in memory while server alive)
let SMID = "B55e1f5b3-5e7b-4c6d-9a31-b8f2d6e4c324";
let CMD = "safe"; // "safe" or "crash"

// -------------------------------
// ✅ GET SMID
// -------------------------------
app.get("/smid", (req, res) => {
  res.send(SMID);
});

// -------------------------------
// 🔧 SET SMID
// -------------------------------
app.get("/set-smid", (req, res) => {
  const value = req.query.value;

  if (!value) {
    return res.send("Usage: /set-smid?value=NEW_SMID");
  }

  SMID = value;
  console.log("SMID updated:", SMID);

  res.send("Updated SMID: " + SMID);
});

// -------------------------------
// ✅ GET COMMAND (for crash control)
// -------------------------------
app.get("/cmd", (req, res) => {
  res.send(CMD);
});

// -------------------------------
// 🔧 SET COMMAND
// -------------------------------
app.get("/set-cmd", (req, res) => {
  const value = req.query.value;

  if (!value) {
    return res.send("Usage: /set-cmd?value=crash OR safe");
  }

  CMD = value;
  console.log("CMD updated:", CMD);

  res.send("Updated CMD: " + CMD);
});

// -------------------------------
// 🔍 Health
// -------------------------------
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
