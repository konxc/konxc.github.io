# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time envs to satisfy production validation during `astro build`.
# Runtime values are still injected from docker-compose env_file.
ARG BETTER_AUTH_BASE_URL=https://www.konxc.space
ARG BETTER_AUTH_SECRET=build_time_only_secret_please_override_in_runtime_012345
ARG TURSO_DATABASE_URL=file:local.db
ENV NODE_ENV=production
ENV BETTER_AUTH_BASE_URL=${BETTER_AUTH_BASE_URL}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV TURSO_DATABASE_URL=${TURSO_DATABASE_URL}

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY pnpm-workspace.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 4321

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4321/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "./dist/server/entry.mjs"]
