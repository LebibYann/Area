# Dockerfile for the ReactTS web app

# Base image
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
