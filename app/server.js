import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import path from "path"
import { Issuer, generators } from 'openid-client';

dotenv.config();

const app = express();
const __dirname = path.resolve()

app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'webapp/build')));

const port = process.env.PORT || 8080;

// Environment variables
const raspberryPiSecret = process.env.RASPBERRY_PI_SECRET;
const API_ROOT = process.env.VIPPS_API_ROOT;
const CLIENT_ID = process.env.VIPPS_CLIENT_ID;
const CLIENT_SECRET = process.env.VIPPS_CLIENT_SECRET;


// OAuth
const vippsIssuer = await Issuer.discover(API_ROOT + '/access-management-1.0/access');

const code_verifier = generators.codeVerifier();
// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.
// TODO: Add new code_verifier for each request


//console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

const client = new vippsIssuer.Client({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uris: ['http://localhost:3000/vipps/redirect'],
  response_types: ['code'],
  // id_token_signed_response_alg (default "RS256")
  // token_endpoint_auth_method (default "client_secret_basic")
});

if (raspberryPiSecret === undefined) {
  console.log(raspberryPiSecret);
  throw new Error(".env variables missing");
}

let raspberryPiUrl = "";


app.get("/open_door", async (req, res) => {
  const data = req.body;

  // TODO read vipps cookies
  // TODO call vipps API to check if the cookie is valid
  // TODO login with vipps if the cookie is invalid

    res.status(500).json({ message: "Error" });
    const success = await sendOpenSignal();
  if (success) {
    res.json({ message: "OK" });
  } else {
    res.status(500).json({ message: "Error" });
  }
});

app.get("/login/auth", async (req, res) => {

  const code_challenge = generators.codeChallenge(code_verifier);

  const authorization_endpoint = client.authorizationUrl({
    scope: 'name phoneNumber openid api_version_2',
    //resource: 'https://my.api.example.com/resource/32178',
    state: 'test1234',
    code_challenge,
    code_challenge_method: 'S256',
  });

  res.json({ message: authorization_endpoint });
});

app.get("/login/token", async (req, res) => {
  const code = res.body.code;
  const redirect_url = res.body.url;

  //if(redirect_url in verifiers)
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
    }
    console.log(responseData);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

app.post("/update_raspberry_pi_url", (req, res) => {
  const data = req.body;

  if (data.secret !== raspberryPiSecret) {
    res.status(500).json({ error: "Invalid secret" });
    return;
  }

  raspberryPiUrl = data.url;
  console.log(raspberryPiUrl);
  res.json({ message: "URL updated!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/webapp/build/index.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
