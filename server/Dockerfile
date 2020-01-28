# Specify a base image
FROM node:slim AS alpine

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install 
COPY . .

# Default command
CMD ["npm", "start"]