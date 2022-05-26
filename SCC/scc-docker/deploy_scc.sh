#!/bin/sh

if [ $# -lt 1 ]; then 
    echo "Usage : ./deploy_scc.sh <SCC Bundle>" $#
    exit 
fi

SCCDIR=scc-deploy

if [ -d "$SCCDIR" ]; then
    echo "removing existing installation directory"
    sudo rm -rf $SCCDIR 
fi

# stop all containers
sudo docker container stop $(sudo docker container ls | grep scc | awk '{print $1}')
# remove all containers
sudo docker container rm $(sudo docker container ls -a | grep scc | awk '{print $1}')
# remove all images
sudo docker rmi -f $(sudo docker images | grep scc | awk '{print $3}')
# remove all volumes
sudo docker volume rm $(sudo docker volume ls | grep scc | awk '{print $2}')

mkdir $SCCDIR

sudo tar -xvzf $1 -C $SCCDIR

sudo docker image load -i $SCCDIR/scc_web.tar
sudo docker image load -i $SCCDIR/scc_app1.tar
sudo docker image load -i $SCCDIR/scc_db.tar
sudo docker image load -i $SCCDIR/scc_adminer.tar  

# sed -i "s/REACT_APP_HOST/$3/g" .env.prod

sudo docker-compose -f docker-compose.local.yml up -d

echo "SCC instance now running"
