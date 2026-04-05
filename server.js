const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------------------
// 🔥 GLOBAL STORAGE
// -------------------------------
let SMID = "B55e1f5b3-5e7b-4c6d-9a31-b8f2d6e4c324";
let CMD = "safe";

// device store
let devices = {};

// -------------------------------
// 🔥 DEVICE PING (TRACKING)
// -------------------------------
app.get("/ping", (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.send("missing id");
  }

  // ✅ FIX REAL CLIENT IP
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

  console.log("Device Updated:", id);

  res.send("ok");
});

// -------------------------------
// 📊 VIEW DEVICES
// -------------------------------
app.get("/devices", (req, res) => {
  res.json(devices);
});

// -------------------------------
// 🔥 CLEAN OFFLINE DEVICES (optional)
// -------------------------------
app.get("/clean", (req, res) => {
  const now = Date.now();

  Object.keys(devices).forEach((id) => {
    const last = new Date(devices[id].lastSeen).getTime();

    // remove if inactive 2 min
    if (now - last > 120000) {
      delete devices[id];
    }
  });

  res.send("Cleaned");
});

// -------------------------------
// ⚙️ COMMAND CONTROL
// -------------------------------
app.get("/cmd", (req, res) => {
  res.send(CMD.trim());
});

app.get("/set-cmd", (req, res) => {
  const value = req.query.value;

  if (!value) {
    return res.send("Usage: /set-cmd?value=crash|safe");
  }

  CMD = value.trim();

  console.log("CMD updated:", CMD);

  res.send("CMD updated: " + CMD);
});

// -------------------------------
// 🔑 SMID CONTROL
// -------------------------------
app.get("/smid", (req, res) => {
  res.send(SMID);
});

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
// 🏠 ROOT
// -------------------------------
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// -------------------------------
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
const SECRET = "mysecret123";

app.use((req, res, next) => {
  if (req.query.key !== SECRET) {
    return res.status(403).send("Forbidden");
  }
  next();
});
