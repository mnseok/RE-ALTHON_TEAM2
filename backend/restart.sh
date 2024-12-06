#!/bin/sh

# delete docker container
docker rm -f flask_app

# delete docker image
docker rmi -f backend-app

# docker compose up
docker-compose up -d
