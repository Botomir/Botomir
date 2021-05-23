FROM node:14 as BUILD

WORKDIR /usr/src/app
COPY ./* ./

RUN npm ci
RUN npm run build

FROM node:14

WORKDIR /usr/src/app

COPY --from=BUILD /usr/src/app/package*.json ./
COPY --from=BUILD /usr/src/app/dist/* ./

RUN npm ci --only=production

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8300/ || exit 1

COPY . .
EXPOSE 8300
CMD [ "node", "app.js" ]
