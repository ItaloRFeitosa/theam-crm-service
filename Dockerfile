FROM node:16.15 AS base
WORKDIR /usr/src/app

EXPOSE 3333

COPY . ./

FROM base as dev
RUN npm ci --silent
CMD ["npm", "run", "dev"]

FROM base as prod
RUN npm ci --silent --only=production
CMD ["node", "./src/application/server.js"]
