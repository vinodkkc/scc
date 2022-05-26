#!/bin/sh

ROOTDIR=$PWD
SCC_TMP_DIR=$PWD/tmp_scc

script_name=$0
env=$1
server_ip=$2

usage() {
    echo ""
    echo "Usage: sh $script_name [build_option [server_ip]]"
    echo "--local:    Build docker for local deployment. SCC UI and other components will be served on localhost."
    echo "--prod:     Build docker for prod deployment. SCC UI and other components will be served on [server_ip]."
    echo ""
}

if [ "$env" != "--prod" ] && [ "$env" != "--local" ]; then
    usage
    exit 1
fi

if [ -d "$SCC_TMP_DIR" ]; then
    sudo rm -rf $SCC_TMP_DIR 
fi

checkDirStructire() {
    if [ -d "../scc-db" ] && [ -d "../scc-adminer" ] && [ -d "../scc-ui" ] && [ -d "../scc-java" ]
    then
        echo "Directory structure check complete."
    else
        echo "Please copy entire SCC folder and maintain directory structure. (some folder is missing.)"
        exit
    fi
}

removePrevBuild() {
    echo $env
    cd $ROOTDIR/..
    if [ "$env" = "--prod" ]; then 
        sudo docker-compose -f docker-compose.yml -f docker-compose-scc.prod.yml --env-file $ROOTDIR/../scc-ui/.env.prod down -v --rmi local --remove-orphans
    else
        sudo docker-compose down -v --rmi local --remove-orphans
    fi
    cd $ROOTDIR
    # sleep 1m
}

getLatestCode() {
    mkdir $SCC_TMP_DIR
    cd $SCC_TMP_DIR
    git clone ssh://code.acds.net.in:29418/SCC

    git_clone_status=$?
    if [ $git_clone_status -eq 0 ]; then
        echo "Fetched latest code."
        cd $ROOTDIR
        cp -r $SCC_TMP_DIR/SCC/SCC/scc-ui/* ../scc-ui/
        # cp -r $SCC_TMP_DIR/SCC/SCC/scc-java/* ../scc-java/
    else
        read -p "Couldn't fetch latest code. Do you want to continue with existing code? [y/n]" selected_option
        case $selected_option in  
            y|Y)
                echo "Continuing with existing code..."
                ;; 
            n|N)
                echo "Exiting..."
                exit $git_clone_status
                ;; 
            *)
                echo "Invalid option.."
                exit $git_clone_status
                ;; 
        esac
    fi
}

replaceEnv() {
    cd $ROOTDIR
    if [ "$env" = "--prod" ] && [ "$server_ip" != "" ]; then
        echo `pwd`
        sed -i "s/localhost/$server_ip/g" $ROOTDIR/../scc-ui/.env.prod
    fi
}

buildAndRunContainers() {
    echo "Building docker images and running containers... \n"
    cd $ROOTDIR/..
    if [ "$env" = "--prod" ]; then 
        sudo docker-compose -f docker-compose.yml -f docker-compose-scc.prod.yml --env-file $ROOTDIR/../scc-ui/.env.prod up -d --build
    else
        sudo docker-compose up -d --build
    fi
    docker_compose_status=$?

    if [ $docker_compose_status -eq 0 ]; then
        echo "*************************************\n"
        sleep 1m
        echo "Containers are running. \n"
    else
        exit $docker_compose_status 
    fi
}

saveImages() {
    if [ "$env" = "--prod" ]; then 
        cd $ROOTDIR
        echo "Creating compressed file from latest image...\n"

        sudo docker image save $(sudo docker image ls | grep scc_web | awk '{print $3}') -o scc_web.tar
        sudo docker image save $(sudo docker image ls | grep scc_app1 | awk '{print $3}') -o scc_app1.tar 
        sudo docker image save $(sudo docker image ls | grep scc_app2 | awk '{print $3}') -o scc_app2.tar 
        sudo docker image save $(sudo docker image ls | grep scc_db | awk '{print $3}') -o scc_db.tar  
        sudo docker image save $(sudo docker image ls | grep scc_adminer | awk '{print $3}') -o scc_adminer.tar  

        file_name=$ROOTDIR/SCC_$(date "+%d_%B_%Y_%H%M%S").tar.gz

        # Bundle docker compose for deployment.
        sudo tar -czvf $file_name scc_web.tar scc_app1.tar scc_app2.tar scc_db.tar scc_adminer.tar scc-docker-compose-deploy.yml 

        sudo rm scc_web.tar scc_app1.tar scc_app2.tar scc_db.tar scc_adminer.tar
        echo "SCC deployment bundle " $file_name "generated successfully."
        sudo rm -rf $SCC_TMP_DIR
    fi 
}
############################################################################

checkDirStructire

removePrevBuild

# getLatestCode

replaceEnv

buildAndRunContainers

saveImages

echo "***************Completed**************\n"
