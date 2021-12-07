import dotenv from "dotenv";
import express from "express";
import * as childProcess from "child_process";
import * as util from "util";

dotenv.config();

const app = express();

app.use(express.json());

const port = 4000;
const raspberryPiSecret = process.env.RASPBERRY_PI_SECRET;

let raspberryPiUrl;

if (raspberryPiSecret === undefined) {
  console.log(raspberryPiSecret);
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
