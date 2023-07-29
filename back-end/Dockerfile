FROM node:16.13.1 AS development

WORKDIR /code

COPY package.json /base/package.json
RUN npm ci

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY . /base

# intall development container 

FROM development as dev-envs

# install git 
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

# add new user vscode to docker group, able to working and test in container
RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /