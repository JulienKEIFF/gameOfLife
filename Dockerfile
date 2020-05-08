FROM alpine:3.11
RUN apk --no-cache add nodejs npm
WORKDIR /game_of_life
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
CMD ["node", "server"]