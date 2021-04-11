FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8300/ || exit 1

COPY . .
EXPOSE 8300
CMD [ "node", "app.js" ]
