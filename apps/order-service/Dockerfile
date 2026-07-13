FROM node:22-alpine

WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm install

EXPOSE 5001

CMD [ "pnpm", "dev" ]