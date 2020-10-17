# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4
# Set the working directory to /api
WORKDIR /api
# copy package.json into the container at /api folder
COPY package*.json /api/
# install dependencies
RUN npm install -g npm@latest && \
    npm cache verify && \
    npm install
# Copy the current directory contents into the container at /api
COPY . /api/
# Run the app when the container launches
CMD ["npm", "start"]