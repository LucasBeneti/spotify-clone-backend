FROM node:20-alpine as BUILD_IMAGE
WORKDIR /server/spotify-clone-back

COPY package.json .

RUN npm install
COPY . .

RUN npm run build

FROM node:20-alpine as PRODUCTION_IMAGE
WORKDIR /server/spotify-clone-back

COPY --from=BUILD_IMAGE /server/spotify-clone-back/dist/ /server/spotify-clone-back/dist/
COPY package.json .
COPY tsconfig.json .
COPY .env .

# needed to run migrations
COPY --from=BUILD_IMAGE /server/spotify-clone-back/src/database/migrations/ /server/spotify-clone-back/src/database/migrations/
COPY knexfile.ts .

EXPOSE 4000

RUN npm install typescript

RUN npx knex migrate:latest

CMD [ "npm", "run", "preview" ]