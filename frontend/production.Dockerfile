# dependency stage
FROM node:18-alpine3.19 as dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# build stage
FROM dependency-stage as build-stage
WORKDIR /app
RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
