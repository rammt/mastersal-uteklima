#!/bin/sh

docker stop $(docker ps -q --filter ancestor=rasp-app)
docker run -p 4000:4000 -p 4001:4001 -d rasp-app
lt -s pretty-mastersal-40 --port 4000
#curl --location --request POST 'http://localhost:4001/new_url' \
#--header 'Content-Type: application/json' \
#--data-raw '{"url": "pretty-mastersal-40"}'
