#!/bin/sh

env=$1

# scc-qa option is to be used when elasticsearch is hosted on same machine.
if [ "$env" = "dummy-elastic" ]; then
    sudo docker-compose -f docker-compose.yml -f docker-compose-dummy-elastic.yml down -v --rmi local --remove-orphans
    sudo docker-compose down -v --rmi local --remove-orphans

    sudo docker-compose -f docker-compose.yml -f docker-compose-dummy-elastic.yml up -d --build
else
    sudo docker-compose -f docker-compose.yml -f docker-compose-dummy-elastic.yml down -v --rmi local --remove-orphans
    sudo docker-compose down -v --rmi local --remove-orphans

    sudo docker-compose up -d --build
fi

sleep 2m

sh import_risk_manager_dashboards.sh