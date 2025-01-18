# Stage 1: Build the NestJS app
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the build output and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port (default: 3000)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]