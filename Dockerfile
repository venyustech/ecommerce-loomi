# Use the official Node.js image as base
FROM node:18.18.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Clean npm cache
RUN npm cache clean --force

# Install dependencies including dev dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the backend files to the working directory
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose port 3001
EXPOSE 3001

