Pre-requisite:
Linux machine with Docker Engine and Docker Compose.
Install Docker Engine on Ubuntu
https://docs.docker.com/engine/install/ubuntu/
Install Docker Compose
https://docs.docker.com/compose/install/
Install Make.
$ sudo apt install make

Note:
1. While copying files somewhere else please maintain directory structure.
2. Ubuntu 20.04 VM was used for this setup.

========================================================================================================
Build and deploy from code. (Dev setup).

1. Clone the following repository from git :
   $ git clone "https://<username>@code.acds.net.in/a/SCC"
2. $ cd SCC/SCC
3. Switch to dev branch.
   $ git switch dev
   $ git pull

-------- Start: ACDS Gerrit steps --------
  If you are starting on new feature/bug, create new branch for feature or bug and push.
  a. $ git checkout -b feature/<JIRA-ID>
        OR
     $ git checkout -b bug/<JIRA-ID>
    
  Switch to your branch now.
  b. $ git switch feature/<JIRA-ID>
  c. $ git push
-------- End: ACDS Gerrit steps --------

5. $ cd SCC/SCC
6. Update Makefile with appropriate component URLs for other modules. If URLs have special characters as #
  then it needs to be escaped using \.
  These values will be copied to release folder.
7. Update CA signed ceriticates in SCC/SCC/scc-ui/ssl folder (Optional on local).
8. Execute make build.
   $ make clean (use this command in case of redeployment)
   $ make build
   SCC Web Application will be hosted on localhost.

-------- Start: ACDS Gerrit steps --------
1. Implement changes. Run make clean and build commands mentioned above.
2. Verify working end to end of your feature.
3. Push for review.
  $ git push origin HEAD:refs/for/feature/<JIRA-ID>
      OR
  $ git push origin HEAD:refs/for/bug/<JIRA-ID>
4. If all changes are reviewed and submitted branch will be updated and available for everyone.
-------- End: ACDS Gerrit steps --------

-------- Start: Update Environment variables. --------
1. Modify .env file in scc-ui folder.
2. $ sudo docker-compose up -d
OR - if container doesn't restart
3. $ sudo docker-compose restart web
-------- End: Update Environment variables. --------

========================================================================================================
Build and deploy from code. (Prod setup).

1. Clone the following repository from git :
   $ git clone "https://<username>@code.acds.net.in/a/SCC"
2. $ cd SCC/SCC
3. switch to dev branch.
   $ git switch dev
4. $ cd SCC/SCC
5. Update Makefile with appropriate component URLs for other modules. If URLs have special characters as #
  then it needs to be escaped using \.
  These values will be copied to release folder.
6. Update CA signed ceriticates in SCC/SCC/scc-docker/ssl folder.
7. Execute make build.
   $ make clean (use this command in case of redeployment)
   $ make build env="--prod"

-------- Start: Update Environment variables. --------
1. Modify .env.prod file in scc-ui folder.
2. $ sudo docker-compose -f docker-compose.yml -f docker-compose-scc.prod.yml --env-file scc-ui/.env.prod up -d
-------- End: Update Environment variables. --------

========================================================================================================
Rebuild and Deploy if 
 a. Latest code update is pulled 
 OR 
 b. If code was deployed using Pre-created(tar in release folder) on the same machine.

1. In case of deploying setup on same machine again execute the below commands first
   $ make cleanall
   $ rm -rf SCC
2. then follow above step of Build and deploy from code (Prod setup)

========================================================================================================
Deployment (From Pre-created build in tar):

1. Run build and deploy from code (prod setup) before executing the deploy script. Tar file should be generated in release folder.
2. Go to release folder.
  $ cd release
3. If the file is not executable then add executable permission using below command,
  $ chmod +x deploy_scc.sh
4. Update CA signed certificates in release/ssl folder.
  Name of certicate files should be exact same as certificate.pem and key.pem.
5. Execute deploy script.
  $ sudo sh deploy_scc.sh <SCC_Bundle>
  e.g. sh deploy_scc.sh SCC_v1.tar.gz
  SCC_Bundle - The tar.gz file which was generated using build script.
  target_dir - The bundle will be decompressed in scc-deploy directory.
Note: Application will be hosted on server address which was specified while creating tar file 
  from above build and from code (prod) setup step.

-------- Start: Update Environment variables. --------
1. Modify .env.prod file in release folder. (.env.prod file needs to be present in release folder.)
2. $ sudo docker-compose -f docker-compose.local.yml up -d

Warning: Keep environment file names as it is. 
If renamed to some custom file name - it also needs to be updated in docker-compose.local.yml file.

-------- End: Update Environment variables. --------

========================================================================================================
Deployment (From Pre-created build in Jenkins):
1. Trigger build for SCC project in Jenkins.
2. Post successful build download artifact as zip.
3. Post the directory contents are extracted - verify the environment variables in .env.prod file.
  Update environment values as per requirement.
4. Execute deploy script.
  $ sudo sh deploy_scc_docker_registry.sh <environment>
  e.g. sh deploy_scc_docker_registry.sh ./.env.prod

-------- Start: Update Environment variables. --------
1. Modify .env.prod file in release folder. (.env.prod file needs to be present in release folder.)
2. $ sudo docker-compose --env-file ./.env.prod up -d

Warning: Keep environment file names as it is. 
If renamed to some custom file name - it also needs to be updated in docker-compose.yml file.
-------- End: Update Environment variables. --------

========================================================================================================