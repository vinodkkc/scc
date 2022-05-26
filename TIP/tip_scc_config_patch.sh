#! /bin/sh

ROOTDIR=$PWD 
MISP_BACKUP=$PWD/MISP_BACKUP

[ -d $MISP_BACKUP ] || mkdir $MISP_BACKUP

createBackup() { 
  sudo docker cp docker-misp_misp_1:/etc/nginx/sites-available/misp $MISP_BACKUP
  echo "Backup successful"
}

applyLogoutStyleChanges() {
  sudo docker cp ./main.css $(sudo docker ps -a | grep misp_misp_1 | awk '{print $1}'):/var/www/MISP/app/webroot/css/
  if [ $? -eq 0 ]; then
    echo "Applied logout button behaviour changes successfully"
  else
    echo "Logout button behaviour changes failed"
  fi
}

copyCertificates(){
#1. used if the script is executed manually after the misp is already installed
sudo docker cp ./cert.pem docker-misp_misp_1:/etc/nginx/certs/cert.pem
sudo docker cp ./key.pem docker-misp_misp_1:/etc/nginx/certs/key.pem

#2. uncomment if the file is getting executed from make file
 # sudo cp cert.pem ../docker/docker-misp/ssl/
 # sudo cp key.pem ../docker/docker-misp/ssl/
 
  echo "SSL Certificates copied."
}

applyDatePickerStyles(){
sudo docker cp ./bootstrap-datepicker.css.map $(sudo docker ps -a | grep misp_misp_1 | awk '{print $1}'):/var/www/MISP/app/webroot/css
  if [ $? -eq 0 ]; then
    echo "datepicker style changes added successfully."
  else
    echo "datepicker changes failed"
  fi
  sudo chown www-data:www-data bootstrap-datepicker.css.map
}

applyConfigChanges()  {
  sudo docker exec -it docker-misp_misp_1 bash -c "sudo -u www-data /var/www/MISP/app/Console/cake admin setSetting MISP.baseurl https://scc-tip.acds.net.in"
  
}

createBuild()  {
  sudo docker cp misp $(sudo docker ps -a | grep misp_misp_1 ):/etc/nginx/sites-available/misp
  sudo docker cp bootstrap-datepicker.css.map $(sudo docker ps -a | grep misp_misp_1 ):/var/www/MISP/app/webroot/css
  
  sudo chown www-data:www-data bootstrap-datepicker.css.map
  
  sudo docker exec docker-misp_misp_1 nginx -s reload
  echo "Build created, Please refresh your browser and verify your changes."
}

#################################################################
createBackup

applyLogoutStyleChanges

applyDatePickerStyles 

copyCertificates

applyConfigChanges

createBuild