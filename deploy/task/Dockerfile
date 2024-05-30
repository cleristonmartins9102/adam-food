FROM node:20
WORKDIR /app
RUN mkdir source

COPY package.json ./
COPY .env ./

COPY tsconfig.json ./source
COPY package.json ./source
COPY .env ./source

COPY src ./source/src
RUN npm install -g npm@latest
RUN cd source && npm i  --legacy-peer-deps && npm run build && cp -r ./build/src ../ 
RUN rm -rf source
RUN npm i --legacy-peer-deps --omit=dev

EXPOSE 3000
CMD ["npm", "start"]


