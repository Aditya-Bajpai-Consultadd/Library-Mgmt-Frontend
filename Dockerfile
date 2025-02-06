
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Build Done. 
# Server
FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]

# FROM nginx:stable-alpine AS production
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]