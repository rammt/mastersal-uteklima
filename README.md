# Mastersal Uteklima

## Architecture

Raspberry Pi init Ngork/localtunnel every 6th hour to the Express server hosted on Heroku.
Include .env SECRET in both Rasp. Pi and Express

React and Express hosted on Heroku. The user accesses the static Heroku URL

Express and Vipps comminucates. Vipps uses the static Heroku URL.

## Getting started

The API and React app reside in the same directory.

### Starting the app

```
cd app webapp
npm install && npm run build && cd ..
&& npm install && npm start

```

### Starting the Raspberry Pi client

This should be run after the server is started.

```
cd raspberry_pi && npm install && npm start

```

#### With Docker
´´´
docker build . -t node-express-app
docker run -d node-express-app
´´´

## Deployment to Heroku
```
git subtree push --prefix app heroku main
```

Set `.env` variables
```
heroku config:set ENV_VAR=value
```