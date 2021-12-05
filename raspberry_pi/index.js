// const express = require("express");
import dotenv from "dotenv";
import express from "express";
import * as childProcess from "child_process";
import * as util from "util";
// import fetch from "node-fetch";

dotenv.config();

const app = express();
// const adminApp = express();

app.use(express.json());
// adminApp.use(express.json());

const port = 4000;
// const adminPort = 4001;
const raspberryPiSecret = process.env.RASPBERRY_PI_SECRET;
// const backendUrl = process.env.BACKEND_URL;

let raspberryPiUrl;

if (raspberryPiSecret === undefined) {
  // if (raspberryPiSecret === undefined || backendUrl === undefined) {
  console.log(raspberryPiSecret);
  // console.log(backendUrl);
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

  const success = openDoorScript();

  if (success) {
    console.log("Open door OK");
    res.json({ message: "Opening door..." });
  } else {
    res.status(500).json({ message: "Error" });
  }
});

// Called from the Docker host only, meaning it is not exposed so we don't need secret key checks
// adminApp.post("/new_url", async (req, res) => {
//   if (req.body.url === undefined) {
//     res.status(500).json({ message: "URL missing" });
//     return;
//   }
//   raspberryPiUrl = req.body.new_url;
//   const success = await sendNewUrl();
//   if (success) {
//     res.json({ message: OK })
//   } else {
//     res.status(500).json({ message: "Error" })
//   }
// })

// const sendNewUrl = async () => {
//   try {
//     const response = await fetch(backendUrl + "/update_raspberry_pi_url", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ secret: raspberryPiSecret, url: raspberryPiUrl }),
//     });

//     const responseData = await response.json();

//     if (response.status !== 200) {
//       console.log(responseData);
//       return false;
//     }
//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

const openDoorScript = async () => {
  const exec = util.promisify(childProcess.exec);

  const { stdout, stderr } = await exec("python gpio_controller.py");

  if (stdout) {
    console.log('stdout:', stdout);
    return true;
  }
  if (stderr) {
    console.error('stderr:', stderr);
    return false;
  }

  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
  return false;
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


// adminApp.listen(adminPort, () => {
//   console.log(`Admin app listening at http://localhost:${adminPort}`);
// });
