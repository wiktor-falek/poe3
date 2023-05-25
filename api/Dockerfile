FROM node:19-alpine

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api/
RUN npm install

COPY . /usr/src/api

EXPOSE 3000
CMD [ "npm", "run", "dev" ]