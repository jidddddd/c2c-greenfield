# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Set the command to serve the build
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 5000
