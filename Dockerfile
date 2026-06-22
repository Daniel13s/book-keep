FROM node:20 AS build

WORKDIR /usr/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .
RUN npm install -g typescript
RUN npx prisma generate
RUN tsc

RUN npm prune --production

FROM node:20-slim AS production

WORKDIR /usr/app

COPY package*.json ./

COPY --from=build /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/prisma ./prisma

EXPOSE 3333

CMD ["node", "dist/server.js"]