#!/usr/bin/env bash
container_name="vqa-api"
image_name="pr0c355/vqa:dev"

source ./stop.sh $container_name

docker image rm $image_name
docker build -t $image_name .