# syntax=docker/dockerfile:1

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS runner
WORKDIR /app

COPY . /app/

RUN pnpm install --frozen-lockfile

RUN pnpm build && pnpm link --dir ./playground

ENTRYPOINT [ "node", "/app/playground/google.js" ]
