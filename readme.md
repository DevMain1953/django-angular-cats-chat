# Overview

Development version of a small service with two tables in the database for cats and messages. The frontend is implemented in Angular, the backend in Django and Django REST. Added authorization, registration and logout functionality. There is a differentiation of access rights and a chat with the ability to send anonymous messages. Messages are sent via Websockets (channels, daphne).

# Installation

- clone this repository using `git clone <link>` command
- you need docker to be installed, run the command below, this will download necessary images and build current application image with all dependencies.
```
docker compose up
```
