# ==================================== BASE ======================================
FROM node:lts as base

ENV API_URL="http://localhost:3000/api/v1/"

COPY . /src

WORKDIR /src

RUN yarn global add @quasar/cli

# =================================== DEV ========================================
FROM base as dev

RUN apt-get update && \
    apt-get install -y mc bash

CMD yarn install && \
    yarn quasar dev