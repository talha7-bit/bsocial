# Use official Node.js LTS version
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Set PORT environment variable to 3000
ENV PORT=3000
EXPOSE 3000

# Command to start your app
CMD ["npm", "start"]