FROM node:20.9.0

WORKDIR /usr/local/app/

COPY package*.json /usr/local/app/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
