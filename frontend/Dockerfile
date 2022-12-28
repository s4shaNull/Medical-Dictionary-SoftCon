# Use an existing Docker image as a base
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json file and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest o the code and build the app
COPY . .
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Run the app when the container starts
CMD ["npm", "start"]
