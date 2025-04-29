# dependency stage
FROM node:22.15-alpine3.21 AS dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# development stage
FROM dependency-stage AS development-stage
WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "dev", "--", "--host=0.0.0.0", "--port=80"]
