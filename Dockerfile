FROM node:20-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
# Copy your custom theme.
COPY themes ./themes

# Copy your custom extensions.
COPY extensions ./extensions

# Copy your config.
COPY config ./config

# DO NOT copy the media folder. It will be handled by a volume.

# Copy your public files.
COPY public ./public

# We must copy translations to the image as they are required for the build.
COPY translations ./translations

# Run npm install.
RUN npm install

# Build assets.
RUN npm run build

# Move build assets to public/assets (Linux equivalent of the requested PowerShell command)
RUN mkdir -p public/assets && cp -r .evershop/build/* public/assets

EXPOSE 3000
CMD ["npm", "run", "start"]
