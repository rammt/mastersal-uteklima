import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import path from "path"

dotenv.config();

const app = express();
const __dirname = path.resolve()

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'webapp/build')));

const port = process.env.PORT || 8080;
const raspberryPiSecret = process.env.RASPBERRY_PI_SECRET;

if (raspberryPiSecret === undefined) {
  console.log(raspberryPiSecret);
  throw new Error(".env variables missing");
}

const raspberryPiUrl = "https://pretty-mastersal-60.loca.lt";

app.get("/raspberry_pi_health_check", async (req, res) => {
  try {
    const response = await fetch(raspberryPiUrl);

    if (response.status === 200) {
      res.json({ message: "OK" });
    } else {
      res.status(500).json({ message: "Raspberry Pi offline" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
})

app.get("/open_door", async (req, res) => {
  const data = req.body;

  // TODO read vipps cookies
  // TODO call vipps API to check if the cookie is valid
  // TODO login with vipps if the cookie is invalid

  const success = await sendOpenSignal();
  if (success) {
    res.json({ message: "OK" });
  } else {
    res.status(500).json({ message: "Error" });
  }
});

const sendOpenSignal = async () => {
  // Sending open signal to Raspberry Pi
  if (raspberryPiUrl === "") {
    console.log("Error: raspberryPiUrl is not set");
    return false;
  }

  try {
    const response = await fetch(raspberryPiUrl + "/open_door", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: raspberryPiSecret }),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      console.log(responseData);
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/webapp/build/index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
