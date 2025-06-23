# Use an official Node.js runtime as the base image
FROM node:18

# Create and set the working directory
WORKDIR /app

# Copy the project files into the Docker image
COPY . .

# Install project dependencies
RUN npm install

# Expose the port the app will run on
EXPOSE 4004

# Command to run the app
CMD ["node", "app.js"]
