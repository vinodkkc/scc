#!/bin/sh

if [ $# -lt 1 ]; then 
    echo "Usage : ./deploy_scc_docker_registry.sh <environment file>" $#
    exit 
fi

ENVFILE=$1


# stop all containers
sudo docker container stop $(sudo docker container ls | grep scc | awk '{print $1}')
# remove all containers
sudo docker container rm $(sudo docker container ls -a | grep scc | awk '{print $1}')
# remove all images
sudo docker rmi -f $(sudo docker images | grep scc | awk '{print $3}')
# remove all volumes
sudo docker volume rm $(sudo docker volume ls | grep scc | awk '{print $2}')


echo "Deploying SCC"

docker-compose --env-file $ENVFILE up --no-build  -d

echo "SCC instance now running"
