#!/bin/bash

# docker stop $(docker ps -q --filter ancestor=rasp-app)
# docker run -p 4000:4000 -d rasp-app
lt -s pretty-mastersal-40 --port 4000 &
npm install && npm start &
wait
#curl --location --request POST 'http://localhost:4001/new_url' \
#--header 'Content-Type: application/json' \
#--data-raw '{"url": "pretty-mastersal-40"}'
