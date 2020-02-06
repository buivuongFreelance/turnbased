#ENTRYPOINT ["tail", "-f", "/dev/null"]
FROM node:10.17.0-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN mv example.env .env
#RUN npm run server:build

EXPOSE 30081

CMD npm start
#CMD ["sleep", "1d"]
