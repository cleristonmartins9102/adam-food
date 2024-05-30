FROM node:20
WORKDIR /app
RUN mkdir source

COPY package.json ./
COPY .env ./

COPY tsconfig.json ./source
COPY package.json ./source
COPY .env ./source

COPY src ./source/src

RUN cd source && npm i --force && npm run build && cp -r ./build/src ../ 
RUN rm -rf source
RUN npm i --force --omit=dev

EXPOSE 3001
CMD ["npm", "start"]


