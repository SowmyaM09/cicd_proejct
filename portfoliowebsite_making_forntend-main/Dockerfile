# Use Node 20
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
