#! /bin/sh

ROOTDIR=$PWD
_now=$(date +"%Y_%m_%d_%I_%M_%S")
SOC_BACKUP=$PWD/SOC_BACKUP_$_now

[ -d $SOC_BACKUP ] || mkdir $SOC_BACKUP

createBackup() {
  sudo docker cp so-soc:/opt/sensoroni/html/js/i18n.js $SOC_BACKUP
  sudo docker cp so-soc:/opt/sensoroni/html/js/app.js $SOC_BACKUP
  sudo docker cp so-soc:/opt/sensoroni/html/index.html $SOC_BACKUP
  sudo docker cp so-soc:/opt/sensoroni/html/js/routes/hunt.js $SOC_BACKUP
  echo "Backup successful"
}

createBuild()  {
  sudo docker cp i18n.js so-soc:/opt/sensoroni/html/js/i18n.js
  sudo docker cp hunt.js so-soc:/opt/sensoroni/html/js/routes/hunt.js
  sudo docker cp app.js so-soc:/opt/sensoroni/html/js/app.js
  sudo docker cp index.html so-soc:/opt/sensoroni/html/index.html
  echo "Build created, Please refresh your browser and verify your changes."
}

#################################################################
createBackup

createBuild
