# Dockerfile for the ReactTS web app

# Base image
FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 8081
EXPOSE 8081

# Run the dev server
CMD [ "npm", "start" ]
