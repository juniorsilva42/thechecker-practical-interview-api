FROM node:12.13.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV APP_ENV=development
ENV HOME_DIR=/home/app

WORKDIR $HOME_DIR/thechecker-practical-interview-api

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000

RUN ls -al

CMD ["npm", "run", "dev"]