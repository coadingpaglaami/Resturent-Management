# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app


ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production
RUN rm -rf .git .github .vscode README.md Dockerfile


# Stage 2: Create the final image
FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache nodejs npm

COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
