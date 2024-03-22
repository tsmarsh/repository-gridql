FROM node:21-alpine

WORKDIR /app

EXPOSE 3033

COPY . .

RUN yarn install --production

# Start the application
CMD ["node", "index"]