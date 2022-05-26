#!/bin/bash
echo "Running Cleanup Script"

# stop all containers
container=$(docker container ls -aq)
if [ -z "$container" ]; then
    echo "No Containers Found"
else
    echo "Stopping Containers"
    docker container stop $(docker container ls -aq)
    echo "Removing Containers"
    docker container rm $(docker container ls -aq)
fi

# Remove Images
images=$(docker images -a -q)
if [ -z "$images" ]; then
    echo "No Images Found"
else
    echo "Removing Images"
    docker rmi -f $(docker images -a -q)
fi

volumes=$(docker volume ls -q)
if [ -z "$volumes" ]; then
    echo "No Volumes Found"
else
    echo "Removing Volumes"
    docker volume rm $(docker volume ls -q)
fi