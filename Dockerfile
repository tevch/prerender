#FROM zenika/alpine-chrome:latest
FROM node:20-alpine

# Install necessary packages for Chromium and its dependencies
# udev and ttf-freefont are common dependencies for font rendering and device management
# chromium is the package for the browser itself
RUN apk update && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

# Set CHROME_BIN for Puppeteer or other tools that might need to locate the executable
ENV CHROME_BIN="/usr/bin/chromium-browser"
# Prevents Puppeteer from downloading its own Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

#RUN apk update
#RUN apk add --update nodejs npm

WORKDIR /spotassist

COPY . .
RUN npm install


CMD sh -c 'npm run start'
#CMD sh -c 'sleep 10000'

