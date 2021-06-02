# Use a lighter version of Node as a parent image
FROM node:14.17.0-alpine3.13

# Set the working directory to /code
WORKDIR /code

# set npm registry
RUN npm config set registry https://registry.npmjs.org/

# copy package.json into the container at /code folder
COPY package*.json .

# install dependencies
RUN echo "[npm] installing..." && \
    npm install

# Copy the current directory contents into the container at /code
COPY . .

# Run the app when the container launches
CMD ["npm", "start"]