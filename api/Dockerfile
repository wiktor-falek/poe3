FROM node:19

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "dev"]