FROM arm32v7/python:2.7.13-jessie
RUN pip install --no-cache-dir rpi.gpio
COPY gpio_controller.py ./

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
EXPOSE 4001

CMD [ "node", "index.js" ]
