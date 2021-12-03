#!/bin/sh

docker stop $(docker ps -q --filter ancestor=rasp-app)
docker run -p 4000:4000 rasp-app
lt --port 4000 &
sleep 10s
kill $!
