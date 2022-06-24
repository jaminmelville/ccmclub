#!/bin/bash
docker stop $(docker ps -a -q)

cd ~/code/web/ccmclub/
docker-compose -f docker-compose.yml -f docker-compose.dev.yml start

atom .
docker-compose logs --tail=50 --follow
