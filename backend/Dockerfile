FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

# Cloud Run injects its own PORT env var at runtime; server.js already
# reads process.env.PORT, so this is just the local/default fallback.
EXPOSE 4000

CMD ["node", "server.js"]
