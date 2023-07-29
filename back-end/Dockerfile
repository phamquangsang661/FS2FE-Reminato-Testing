# Stage 1
FROM node:16.13.1 AS installation

WORKDIR /base

COPY ./package.json /base/package.json
RUN npm ci
RUN npm run db:auto-prod; 

# Stage 2
FROM installation AS development
COPY . /base

# Stage 3
FROM development AS operation 
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# Stage 4
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