FROM node:20-alpine

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package.json ./
RUN npm install

# Copy application files
COPY . .

EXPOSE 5173

# Start Vite dev server on 0.0.0.0 for docker network exposure
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
