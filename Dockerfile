# Step 1: Build the React application
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Create the production-ready image with Nginx
FROM nginx:alpine

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the build image to the Nginx web server
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration (optional)
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx to serve the React application
CMD ["nginx", "-g", "daemon off;"]
