# Pull base image
# FROM dockerhub.test.com/it-dockerpreprod/demo/testit-ui-base:2

# Expose port 8080
EXPOSE 8080

RUN apk add --update --no-cache curl

# Copy custom configuration file from the current directory
RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copy source code into /usr/src/app
RUN mkdir -p /usr/src/app
COPY . /usr/src/app

# npm install and build
RUN cd /usr/src/app && cp -r /usr/src/app/dist /ui-core &&  cp -r /usr/src/app/dist /ui-core/rainier && cp -r /usr/src/app/dist/index.html /ui-core &&  cp -r /usr/src/app/dist/index.html /ui-core/rainier && rm -rf /usr/src/app

# Start up nginx server
CMD ["nginx"]
