FROM node:20-alpine
WORKDIR /app
RUN npm install -g npm@9

# 1. Copy package files first (changes rarely).
COPY package*.json .

# 2. Copy themes and extensions (npm workspaces need them for install).
COPY themes ./themes
COPY extensions ./extensions

# 3. Install dependencies (cached unless package*.json, themes or extensions change).
RUN npm install

# 4. Compile TypeScript in extensions and themes.
RUN cd extensions/sample && npx tsc || true \
    && cd /app/extensions/sample && find src -type f ! -name '*.ts' ! -name '*.tsx' -exec sh -c 'mkdir -p "dist/$(dirname "${1#src/}")" && cp "$1" "dist/${1#src/}"' _ {} \; \
    && cd /app/themes/sample && npx tsc || true \
    && find src -type f ! -name '*.ts' ! -name '*.tsx' -exec sh -c 'mkdir -p "dist/$(dirname "${1#src/}")" && cp "$1" "dist/${1#src/}"' _ {} \;

# 5. Copy config and translations AFTER install (config changes won't invalidate npm install).
COPY config ./config
COPY translations ./translations

# 6. Build assets.
RUN npm run build

# 7. Move build assets to public/assets.
RUN mkdir -p public/assets && cp -r .evershop/build/* public/assets

EXPOSE 3000
CMD ["npm", "run", "start"]
