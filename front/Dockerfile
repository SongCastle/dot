FROM node:14.17.1-slim

# 参考:
# https://www.creationline.com/lab/29422
# https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/Dockerfile

WORKDIR /opt/front

COPY ./package.json ./package-lock.json* ./
RUN npm cache clean --force && npm uninstall && npm install

# curl, ss, ps コマンド利用するため
RUN apt-get update && apt-get install -y curl iproute2 procps

CMD ["npm", "start"]
