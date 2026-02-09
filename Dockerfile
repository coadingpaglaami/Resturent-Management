#### NEW File  ########

# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

#RUN npm ci
RUN npm install


COPY . .

RUN npm run build

# Remove development dependencies
RUN npm prune --production


# Remove unnecessary files
RUN rm -rf .git .github .vscode README.md Dockerfile

# Stage 2: Create the final image
FROM alpine:latest

WORKDIR /app

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
