#!/usr/bin/env bash

if [ $# -ne 1 ]; then
    image_name="pr0c355/vqa:dev"
    container_name="vqa-api"
else
    image_name="$1"
    container_name="$2"
fi

source ./stop.sh $container_name

docker run -d -p 8000:8000 --env-file .env --name vqa-api $image_name