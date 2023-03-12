
FROM node:16-alpine

ARG NAME
ARG TYPE
ARG PORT
ARG WORKDIR

ENV \
   NAME=${NAME:?error} \
   TYPE=${TYPE:-main} \
   PORT=${PORT:?${NAME}_error} \
   WORKDIR=${WORKDIR:?${NAME}_error}

WORKDIR ${WORKDIR}

COPY . .

RUN npm install

RUN npm run build

RUN npm run generate

CMD ["npm", "run", "start"]

EXPOSE ${PORT}
