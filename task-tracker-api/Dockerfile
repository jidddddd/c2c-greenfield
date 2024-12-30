# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild native modules
RUN npm rebuild sqlite3

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Set the command to run the application
CMD ["node", "index.js"]
