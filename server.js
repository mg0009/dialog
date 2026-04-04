// server.js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Change this value anytime (dynamic control)
let SMID = "B55e1f5b3-5e7b-4c6d-9a31-b8f2d6e4c324";

// ✅ GET SMID
app.get("/smid", (req, res) => {
  res.send(SMID);
});

// 🔧 Optional: Change SMID from browser (for testing)
app.get("/set", (req, res) => {
  const value = req.query.value;

  if (!value) {
    return res.send("Usage: /set?value=NEW_SMID");
  }

  SMID = value;
  console.log("SMID updated:", SMID);

  res.send("Updated SMID: " + SMID);
});

// 🔍 Health check
app.get("/", (req, res) => {
  res.send("SMID Server Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
