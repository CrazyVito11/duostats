# dependency stage
FROM node:22.15-alpine3.21 AS dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# build stage
FROM dependency-stage AS build-stage
WORKDIR /app
RUN npm run build


# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
