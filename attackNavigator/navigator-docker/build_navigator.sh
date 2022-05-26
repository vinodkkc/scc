#!/bin/sh

echo "*************************************"
echo "Build Script for Attack Navigator."
echo "This will build images from latest code, create containers and start them."
echo "All new images built, are compressed and stored in tar.gz file."
echo "*************************************"
ROOTDIR=$PWD 
NAVIGATOR_TMP_DIR=$PWD/tmp_navigator

script_name=$0
env=$1
server_ip=$2

usage() {
    echo ""
    echo "Usage: sh $script_name [build_option [server_ip]]"
    echo "--local:    Build docker for local deployment. Navigator UI and other components will be served on localhost."
    echo "--prod:     Build docker for prod deployment. Navigator UI and other components will be served on [server_ip]."
    echo ""
}

if [ "$env" != "--prod" ] && [ "$env" != "--local" ]; then
    usage
    exit 1
fi

if [ -d "$NAVIGATOR_TMP_DIR" ]; then
    sudo rm -rf $NAVIGATOR_TMP_DIR 
fi

############################################################################

checkDirStructire() {
    if [ -d "../navigator-db" ] && [ -d "../navigator-adminer" ] && [ -d "../navigator-ui" ] && [ -d "../matrix-ui" ] && [ -d "../navigator-server" ]
    then
        echo "Directory structure check complete.\n"
    else
        echo "Please copy entire Attack Navigator folder and maintain directory structure. (some folder is missing.)\n"
        exit
    fi
}

takeDBBackup() {
    echo "Taking db backup...\n"

    date_time=$(date +%d-%m-%Y"_"%H_%M_%S)
    echo $date_time
    sudo docker exec -t navigator-db pg_dump -U postgres -d navigator_db -F p > dump_$date_time.sql

    db_backup_status=$?
    if [ $db_backup_status -eq 0 ]; then
        sudo mv ../navigator-db/attack_navigator.sql ../navigator-db/backup_$date_time.sql
        sudo mv dump_$date_time.sql ../navigator-db/attack_navigator.sql
        echo "Backup completed.\n"
    else
        sudo rm dump_$date_time.sql
        read -p "Couldn't take DB backup. Do you want to continue with existing DB file? [y/n]" selected_option
        case $selected_option in  
            y|Y)
                echo "Continuing with existing db file..."
                ;;
            n|N)
                echo "Exiting..." 
                exit $db_backup_status
                ;; 
            *) 
                echo "Invalid option..."
                exit $db_backup_status
                ;;
        esac
    fi
}

removePrevBuild() {
    echo $env
    if [ "$env" = "--prod" ]; then 
        sudo docker-compose -f ../docker-compose.yml -f ../docker-compose.prod.yml down -v --rmi all
    else 
        sudo docker-compose -f ../docker-compose.yml -f ../docker-compose.override.yml down -v --rmi local
    fi

    # sleep 1m

    echo "Removed earlier containers, build images, networks, volumes." 
    echo "*************************************\n"
}

getLatestCode() {
    echo "Fetching latest code...\nEnsure you provide correct password for your private key. \n"
    mkdir $NAVIGATOR_TMP_DIR
    cd $NAVIGATOR_TMP_DIR
    git clone git@10.11.93.198:/home/git/Sandbox/

    git_clone_status=$?
    if [ $git_clone_status -eq 0 ]; then
        echo "Fetched latest code."
        cd $ROOTDIR
        cp -r $NAVIGATOR_TMP_DIR/Sandbox/Manoj/Docker/attackNavigator/navigator-ui/* ../navigator-ui/
        cp -r $NAVIGATOR_TMP_DIR/Sandbox/Manoj/Docker/attackNavigator/matrix-ui/* ../matrix-ui/
        cp -r $NAVIGATOR_TMP_DIR/Sandbox/Manoj/Docker/attackNavigator/navigator-server/* ../navigator-server/
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
		sed -i "s/10.11.92.191/$server_ip/g" ../navigator-server/src/prod.env
        sed -i "s/10.11.92.191/$server_ip/g" ../navigator-server/src/prod_settings.py
        sed -i "s/10.11.92.191/$server_ip/g" ../matrix-ui/nav-app/src/environments/environment.prod.ts
        sed -i "s/10.11.92.191/$server_ip/g" ../navigator-ui/src/environments/environment.prod.ts
    fi
}

buildAndRunContainers() {
    echo "Building docker images and running containers... \n"
    cd $ROOTDIR
    if [ "$env" = "--prod" ]; then 
        sudo docker-compose -f ../docker-compose.yml -f ../docker-compose.prod.yml up -d --build
    else 
        sudo docker-compose -f ../docker-compose.yml -f ../docker-compose.override.yml up -d --build
    fi

    docker_compose_status=$?

    if [ $docker_compose_status -eq 0 ]; then
    
        echo "*************************************\n"
        echo "Containers are running. \n"
        echo "Creating compressed file from latest image...\n"
        sleep 1m
        
        sudo docker image save $(sudo docker image ls | grep navigator_web1 | awk '{print $3}') -o navigator_web1.tar
        sudo docker image save $(sudo docker image ls | grep navigator_web2 | awk '{print $3}') -o navigator_web2.tar
        sudo docker image save $(sudo docker image ls | grep navigator_app | awk '{print $3}') -o navigator_app.tar 
        sudo docker image save $(sudo docker image ls | grep navigator_db | awk '{print $3}') -o navigator_db.tar  
        sudo docker image save $(sudo docker image ls | grep navigator_adminer | awk '{print $3}') -o navigator_adminer.tar  

        file_name=$ROOTDIR/NAVIGATOR_$(date "+%d_%B_%Y_%H%M%S").tar.gz

        # Bundle docker compose for deployment.
        sudo tar -czvf $file_name navigator_web1.tar navigator_web2.tar navigator_app.tar navigator_db.tar navigator_adminer.tar navigator-docker-compose-deploy.yml 

        sudo rm -rf navigator_web1.tar navigator_web2.tar navigator_app.tar navigator_db.tar navigator_adminer.tar
        echo "Attack Navigator deployment bundle " $file_name "generated successfully."
    
        sudo rm -rf $NAVIGATOR_TMP_DIR
    else
        exit $docker_compose_status
    fi
}

############################################################################

checkDirStructire

takeDBBackup

removePrevBuild

getLatestCode

replaceEnv

buildAndRunContainers

echo "***************Completed**************\n"