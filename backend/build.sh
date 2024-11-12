container_name="vqa-api"
image_name="pr0c355/vqa:v0"

if [ "$( docker container inspect -f '{{.State.Running}}' $container_name )" = "true" ]; then
    docker stop $container_name
    docker rm $container_name
fi

docker image rm $image_name
docker build -t $image_name .