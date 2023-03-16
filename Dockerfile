
FROM node:16-alpine

ARG NAME
ARG TYPE
ARG PORT
ARG WORKDIR
ARG NUXT_HOST

ENV \
   NAME=${NAME:?error} \
   TYPE=${TYPE:-main} \
   PORT=${PORT:?${NAME}_error} \
   WORKDIR=${WORKDIR:?${NAME}_error} \
   ### FOR NUXT APP ###
   NUXT_HOST=${NUXT_HOST:-0.0.0.0} \
   NUXT_PORT=${PORT:?${NAME}_error}

WORKDIR ${WORKDIR}

COPY . .

RUN npm install

RUN npm run build

RUN npm run generate

CMD ["npm", "run", "start"]

EXPOSE ${PORT}
