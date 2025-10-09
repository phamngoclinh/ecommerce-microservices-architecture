# syntax=docker/dockerfile:1

### ----- STAGE 1: BUILD -----
FROM node:20-alpine AS builder

WORKDIR /app

# Thiết lập biến môi trường mặc định
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# Copy toàn bộ workspace metadata để npm install dependencies root
COPY package*.json ./
COPY apps/${APP_NAME}/package*.json ./apps/${APP_NAME}/

# Cài dependencies cho toàn monorepo
RUN npm install

# Copy toàn bộ source code (để cho phép Nest CLI build)
COPY . .

# Build app
RUN npm run build $APP_NAME

### ----- STAGE 2: RUNTIME -----
FROM node:20-alpine AS runner

WORKDIR /app

# Thiết lập biến môi trường mặc định
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# Copy only package.json để cài prod deps
COPY package*.json ./
COPY apps/${APP_NAME}/package*.json ./apps/${APP_NAME}/

RUN npm install --only=production --omit=dev

# Copy build output từ builder
COPY --from=builder /app/dist/apps/${APP_NAME} ./dist

# Chạy app
EXPOSE 3000

CMD ["sh", "-c", "node dist/main"]



# chay roi ne
# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# CMD ["node", "dist/apps/order-service/main"]
