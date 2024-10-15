# Use the official Node.js 18-alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port your API runs on (e.g., 3000)
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]
