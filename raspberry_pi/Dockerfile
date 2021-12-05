FROM python:3.9
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir RPi.GPIO

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
EXPOSE 4001

CMD [ "node", "index.js" ]
