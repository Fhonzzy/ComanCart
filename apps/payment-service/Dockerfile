FROM node:22-alpine

WORKDIR /app

COPY . .

RUN corepack enable

RUN pnpm install

EXPOSE 5002

CMD [ "pnpm", "dev" ]