Pre-requisite:
Linux machine with Docker Engine and Docker Compose.
Install Docker Engine on Ubuntu
https://docs.docker.com/engine/install/ubuntu/
Install Docker Compose
https://docs.docker.com/compose/install/


Note:
1. While copying files somewhere else please maintain directory structure.
2. Ubuntu 20.04 VM was used for this setup.

----------------------------------------------------
Build and deploy from code. (Dev setup).

1. Git clone Sandbox folder and then copy Sandbox/Manoj/Docker to VM
2. Copy id_rsa key to VM's .ssh folder and make it read-only. (Which is shared for git repo access.) 
  $ chmod 400 ~/.ssh/id_rsa
3. cd Docker/attackNavigator/navigator-docker
4. If the file is not executable then add executable permission using below command,
  $ chmod +x build_navigator.sh
5. Execute build script.
  $ sudo sh build_navigator.sh --local
  All services will be hosted on localhost.

----------------------------------------------------
Build and deploy from code. (Prod setup).

1. Git clone Sandbox folder and then copy Sandbox/Manoj/Docker to VM
2. Copy id_rsa key to VM's .ssh folder and make it read-only. (Which is shared for git repo access.) 
  $ chmod 400 ~/.ssh/id_rsa
3. cd Docker/attackNavigator/navigator-docker
4. If the file is not executable then add executable permission using below command,
  $ chmod +x build_navigator.sh
5. Execute build script.
  $ sudo sh build_navigator.sh --prod <server_ip>
  <server_ip> - All services will be hosted here.
  Note: If this value is not provided then default server_ip is 10.11.92.191.
----------------------------------------------------

Deployment (From Pre-created build):

1. Git clone Sandbox folder and then copy Sandbox/Manoj/Docker to VM
2. cd Docker/attackNavigator/navigator-docker
3. If the file is not executable then add executable permission using below command,
  $ chmod +x deploy_navigator.sh
4. Execute build script.
  $ sudo sh deploy_navigator.sh <Navigator_Bundle> <target_dir> <server_ip>
  e.g. sudo ./deploy_navigator.sh NAVIGATOR_28_Aug_2021_091120.tar.gz navigator-deploy 0.0.0.0
  Navigator_Bundle - The tar.gz file which was generated using build script.
  target_dir - The bundle will be decompressed here.
  server_ip - server_ip where the build is being deployed.