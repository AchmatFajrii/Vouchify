FROM node:alpine

ENV NODE_ENV="development"

# Create app directory
WORKDIR /usr/src/devlopment

# Install all depedency
COPY package*.json ./

RUN npm install --silent

# Bundle app source
COPY . ./

EXPOSE 7314