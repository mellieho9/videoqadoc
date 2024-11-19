#!/usr/bin/env bash

# Check if a container name was provided
if [ $# -ne 1 ]; then
    container_name="vqa-api"
else
    container_name="$1"
fi

# Check if the container is running
if [ "$(docker container inspect -f '{{.State.Running}}' "$container_name")" = "true" ]; then
    echo "Stopping and removing the container: $container_name"
    docker stop "$container_name"
    docker rm "$container_name"
else
    echo "The container $container_name is not running."
fi