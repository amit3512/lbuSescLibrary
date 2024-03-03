# Use an official Node runtime as a parent image
FROM node:16.17.1

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy both backend and frontend code to /app
COPY . .

# Set environment variables
ENV MONGO_URI="mongodb://localhost:27017/sesc"
ENV NODE_ENV="development"
ENV JWT_SECRET_KEY="someSuperSecretKey123"

# Expose port 3000 for the frontend (assuming your frontend uses this port during development)
EXPOSE 3000

# Start both backend and frontend with nodemon
CMD ["npx", "nodemon", "backend/app.js", "--watch", "."]
