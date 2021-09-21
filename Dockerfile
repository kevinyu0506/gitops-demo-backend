FROM node:14-alpine

ARG ENV_PHASE=development

ENV ENV_PHASE=${ENV_PHASE}

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

RUN cp ./app/config/${ENV_PHASE}/db.config.js ./app/config/db.config.js

CMD [ "node", "server.js" ]
