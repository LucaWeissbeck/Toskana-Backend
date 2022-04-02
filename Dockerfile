# Base Image
FROM node:14-alpine

# Working directory inside container

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install 

# Copy everything from current directory into the /app in container
COPY . .

EXPOSE 8080
# Start App
CMD ["node", "./bin/www"]