# Mastersal Uteklima

## Architecture

Raspberry Pi init Ngork/localtunnel every 6th hour to the Express server hosted on Heroku.
Include .env SECRET in both Rasp. Pi and Express

React and Express hosted on Heroku. The user accesses the static Heroku URL

Express and Vipps comminucates. Vipps uses the static Heroku URL.

## Getting started

### Starting the server

```
cd app && npm start

```

### Starting the React app

```
cd app/webapp && npm start

```

### Starting the Raspberry Pi client

This should be run after the server is started.

```
cd raspberry_pi && npm start

```
