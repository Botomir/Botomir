FROM node:17 as BUILD

ARG VCS_REF='unknown'
ENV VCS_REF=$VCS_REF

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:17

ARG VCS_REF='unknown'
ENV VCS_REF=$VCS_REF

LABEL org.opencontainers.version="v1.0.0"

LABEL org.opencontainers.image.authors="Marshall Asch <maasch@rogers.com> (https://marshallasch.ca), Sooraj Modi <soorajmodi@hotmail.ca> (https://soorajmodi.com)"
LABEL org.opencontainers.image.url="https://github.com/botomir/botomir.git"
LABEL org.opencontainers.image.source="https://github.com/botomir/botomir.git"
LABEL org.opencontainers.image.licenses="GPL-2.0-only"
LABEL org.opencontainers.image.title="Botomir"
LABEL org.opencontainers.image.description="Webapp and Discord bot, Botomir."

WORKDIR /usr/src/app

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8300/ || exit 1

EXPOSE 8300
CMD [ "node", "app.js" ]

COPY --from=BUILD /usr/src/app/package*.json ./
RUN 



COPY --from=BUILD /usr/src/app/dist ./
COPY --from=BUILD /usr/src/app/views ./views/
COPY --from=BUILD /usr/src/app/static ./static/
COPY --from=BUILD /usr/src/app/docs ./docs/


# these two labels will change every time the container is built
# put them at the end because of layer caching
LABEL org.opencontainers.image.revision="${VCS_REF}"

ARG BUILD_DATE
LABEL org.opencontainers.image.created="${BUILD_DATE}"
