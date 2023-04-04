FROM node:18-alpine
WORKDIR /carnatic-message-bus
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
