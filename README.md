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
cd app/webapp && npm install && npm run build && cd ..
&& npm install && npm start

```

### Starting the Raspberry Pi client

This should be run after the server is started.

```
cd raspberry_pi && npm install && npm start

```

#### Starting the Raspberry Pi client with Docker (recommended)
´´´
docker build . -t node-express-app
docker run -p 4000:4000 -p 4001:4001 -d node-express-app
lt --port 4000
´´´

The 4001 port is used to communicate from the Docker host to the Docker container by receiving a GET call to `localhost:4001/new_url` and is not exposed to the Internet.

## Deployment to Heroku
```
git subtree push --prefix app heroku main
```

Set `.env` variables
```
heroku config:set ENV_VAR=value
```