# dependency stage
FROM node:18-alpine3.19 as dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# build stage
FROM dependency-stage as production-stage
WORKDIR /app
RUN npm run build
ENV PORT=80
EXPOSE 80
CMD ["node", "dist/index.js"]
