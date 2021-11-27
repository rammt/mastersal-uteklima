// const express = require("express");
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;
const raspberryPiSecret = process.env.RASPBERRY_PI_SECRET;
const backendUrl = process.env.BACKEND_URL;
const hourlyInterval = 6;

if (raspberryPiSecret === undefined || backendUrl === undefined) {
  console.log(raspberryPiSecret);
  console.log(backendUrl);
  throw new Error(".env variables missing");
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/open_door", (req, res) => {
  if (req.body.secret !== raspberryPiSecret) {
    res.status(500).json({ error: "Invalid secret" });
    return;
  }

  console.log("nice");

  res.json({ message: "Opening door..." });
});

setInterval(() => getNewUrlAndSendIt(), hourlyInterval * 1000 * 3600); // Calls every hourlyInterval hour

const getNewUrlAndSendIt = async () => {
  const url = "http://localhost:4000"; // TODO read the url from localtunnel/ngork

  try {
    const response = await fetch(backendUrl + "/update_raspberry_pi_url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: raspberryPiSecret, url: url }),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      console.log(responseData);
    }
  } catch (err) {
    console.log(err);
  }
};

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

getNewUrlAndSendIt(); // Call this immediately on startup
