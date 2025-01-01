# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the backend port
EXPOSE 5001

# Command to start the application
CMD ["npm", "start"]