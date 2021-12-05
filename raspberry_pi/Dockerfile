FROM python:3.7
RUN pip3 install --upgrade pip
RUN pip3 install wheel
RUN pip3 install RPi.GPIO

FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
EXPOSE 4001

CMD [ "node", "index.js" ]
