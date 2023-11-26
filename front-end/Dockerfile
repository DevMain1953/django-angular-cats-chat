FROM node:20.10
RUN npm install -g @angular/cli@17.0.3

# Install dependencies
RUN mkdir /angular-app
COPY . /angular-app
WORKDIR /angular-app
RUN npm install

EXPOSE 8080