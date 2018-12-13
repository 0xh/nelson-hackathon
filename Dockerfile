# Create the build image
###############################
FROM docker.nelson.rn:9001/nelson-core/devtools/nelson-node-v8:latest

# Copy project files to container
COPY --chown=dockeruser:dockeruser . /home/dockeruser

RUN npm install

# Run the tests
RUN CI=true npm test

# If tests pass, run the project

# Set the build environment to be production
ENV NODE_ENV=production

# Build the app
RUN npm run build

EXPOSE 3000

# Move into the build directory
RUN cd dist

# Run the project
CMD ["http-server",  "-p", "3000", "&"]
