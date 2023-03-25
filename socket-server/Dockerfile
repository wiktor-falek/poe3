FROM node:19

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "dev"]