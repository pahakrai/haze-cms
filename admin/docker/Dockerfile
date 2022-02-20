ARG NPM_TOKEN

# base image
FROM node:8.10.0-alpine

ARG NPM_TOKEN

# set working directory
#     create app folder
RUN mkdir -p /usr/src/app
#     move to app folder
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
#     install .npmrc to handle private repo
COPY docker/.docker_npmrc /usr/src/app/.npmrc
#     copy package.json to app folder
COPY package.json /usr/src/app/package.json
#     copy yarn.lock to app folder
COPY yarn.lock /usr/src/app/yarn.lock
#     install package dependencies
RUN yarn install --frozen-lockfile --silent
#     remove .npmrc so npm token is not exposed
RUN rm -f /usr/src/app/.npmrc

EXPOSE 3000

# start app
CMD ["react-scripts", "start"]



# https://medium.com/@shemleong/using-docker-and-yarn-for-development-2546e567ad2
