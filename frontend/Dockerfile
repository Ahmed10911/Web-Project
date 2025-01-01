# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-optional

# Explicitly install the correct version of esbuild to fix version mismatch
RUN npm install esbuild@0.21.5

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Use Nginx to serve the React app
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
