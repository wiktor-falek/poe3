FROM node:19-alpine

RUN mkdir -p /usr/src/game-server
WORKDIR /usr/src/game-server

COPY package.json /usr/src/game-server/
RUN npm install

COPY . /usr/src/game-server

EXPOSE 4000
CMD [ "npm", "run", "dev" ]