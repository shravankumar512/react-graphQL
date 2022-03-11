# Use a lighter version of Node as a parent image
FROM node:14.17.0-alpine3.13
# Set the working directory to /code
WORKDIR /code

# set npm registry
RUN npm config set registry https://registry.npmjs.org/

# copy package.json into the container at /code
COPY package*.json ./

# install dependencies
RUN echo "[npm] installing..." && \
    npm install

# Copy the current directory contents into the container at /code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
