# dependency stage
FROM node:22.15-alpine3.21 AS dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# build stage
FROM dependency-stage AS production-stage
WORKDIR /app
RUN npm run build
ENV PORT=80
EXPOSE 80
CMD ["node", "dist/index.js"]
