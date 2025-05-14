FROM node:22-alpine

# Set working directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy environment file and source code
COPY .env .env
COPY . .

# Build the project
RUN npm run build

# Expose the port your Nest app runs on
EXPOSE 3200

# Start the NestJS app in production
CMD ["npm", "run", "start:prod"]
