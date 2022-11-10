FROM node:18.12.0-alpine

LABEL maintainer="José Ramos <nettorammos@hotmail.com>"

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "run", "start" ]