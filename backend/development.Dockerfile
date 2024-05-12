# dependency stage
FROM node:18-alpine3.19 as dependency-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# development stage
FROM dependency-stage as development-stage
WORKDIR /app
ENV PORT=80
EXPOSE 80
CMD ["npm", "run", "dev"]
