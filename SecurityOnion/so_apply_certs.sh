#!/bin/sh

mkdir cert_backup
sudo cp /etc/pki/managerssl.crt cert_backup/
sudo cp /etc/pki/managerssl.key cert_backup/

echo "--------------------------------------"
echo "SO certificates backup complete. "

sudo cp managerssl.crt /etc/pki/
sudo cp managerssl.key /etc/pki/

echo "--------------------------------------"
echo "SO certificates replaced with ACDS widlcard certificates. "

echo "Restarting nginx."
sudo so-nginx-restart

echo "SO nginx restarted."
