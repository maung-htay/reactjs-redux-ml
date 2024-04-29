FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build for production using Vite's production config
RUN npm run build --config=vite.production.config.js

# Create a new base image with a smaller footprint
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
