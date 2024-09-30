FROM node:16-alpine
WORKDIR /chatbotfrontend
ENV PATH="/chatbotfrontend/node_modules/.bin:$PATH"
COPY  package.json ./
COPY  package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]