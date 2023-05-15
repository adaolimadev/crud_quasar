# Define a versão do Node.js que será instalada
ARG NODE_VERSION=18.15.0

# Usa a imagem mais recente do Node.js como base
FROM node:latest

# Atualiza os pacotes do sistema operacional, instala o curl e instala o Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_19.x | bash - &&\
    apt-get install -y nodejs

# Instala o CLI do Vue.js globalmente
RUN npm install -g @vue/cli

RUN npm install -g json-server

RUN npm install -g @quasar/cli

# Define o diretório de trabalho
WORKDIR /app

EXPOSE 8000 8080 3000 9000
