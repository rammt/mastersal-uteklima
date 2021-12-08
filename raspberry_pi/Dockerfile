# FROM arm32v7/python:2.7.13-jessie
# COPY gpio_controller.py ./
# RUN pip install --no-cache-dir rpi.gpio

# FROM node:16

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 4000
# EXPOSE 4001

# CMD [ "node", "index.js" ]

# Nice
# FROM node:16 as build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM arm32v7/python:2.7.13-jessie
# COPY gpio_controller.py ./
# COPY --from=build /app/build ./
# EXPOSE 4000

# CMD ["node", "index.js"]

# https://earthly.dev/blog/docker-multistage/

FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
COPY gpio_controller.py ./

RUN which python
RUN whereis python
RUN ls -ls /usr/bin/python*
RUN python -m pip install --no-cache-dir rpi.gpio

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]
