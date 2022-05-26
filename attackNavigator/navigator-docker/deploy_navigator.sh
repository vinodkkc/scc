#!/bin/sh

if [ $# -lt 3 ]; then 
    echo "Usage : ./deploy_navigator.sh <Navigator_Bundle> <target_dir> <server_ip>" $#
    exit 
fi
ROOTDIR=$PWD

NAVIGATORDIR=$2

if [ -d "$NAVIGATORDIR" ]; then
    echo "removing existing installation directory"
    sudo rm -rf $NAVIGATORDIR 
fi

# Remove docker containers which are created by build script.
sudo docker-compose -f ../docker-compose.yml  -f ../docker-compose.prod.yml down -v --rmi local

# Remove docker containers if they have been created by deploy script earlier.
sudo docker-compose -f navigator-docker-compose-deploy.yml down -v --rmi local

mkdir $NAVIGATORDIR

echo "Installing NAVIGATOR in " $2 "..."

sudo tar -xvzf $1 -C $NAVIGATORDIR

cd $NAVIGATORDIR

sudo docker image load -i navigator_web1.tar
sudo docker image load -i navigator_web2.tar
sudo docker image load -i navigator_app.tar
sudo docker image load -i navigator_db.tar
sudo docker image load -i navigator_adminer.tar  

#sed -i "s/localhost/$3/g" docker-compose.yml

sudo docker-compose -f navigator-docker-compose-deploy.yml up -d

#echo "NAVIGATOR instance now running at https://$3 "
