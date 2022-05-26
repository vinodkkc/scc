Pre-requisite:
Linux machine with Docker Engine and Docker Compose.
Install Docker Engine on Ubuntu
https://docs.docker.com/engine/install/ubuntu/
Install Docker Compose
https://docs.docker.com/compose/install/

Note:
1. While copying files somewhere else please maintain directory structure.
2. Ubuntu 20.04 VM was used for this setup.

RM Pre-requisite:
Please make sure that RM elasticsearch is up and running and accessible from
machine where this Kibana is being installed.
It should have below indices with exact names as below and proper field mappings present.
1. risk-report
2. scan-compliance
3. scan-vulnerability

1. Update 'Risk Manager'/.env file to point to correct Elasticsearch service.
  Update both ELASTICSEARCH_URL and ELASTICSEARCH_HOSTS env variables.
2. Update Elasticsearch and Kibana variables in 'Risk Manager/import_risk_manager_dashbaords.sh' script.
3. Run below commands to make both scripts executable.
  $ chmod +x import_risk_manager_dashbaords.sh
  $ chmod +x deploy_scc_rm.sh
4. Run below command to deploy kibana from docker and then import dashboards definitions. 
  $ sh deploy_scc_rm.sh

Once above script is executed successfully, access the printed Kibana URL printed in browser.
For e.g. https://<ip-address>:5601/
Go to Dashboards page from Menu and open below 3 dashboards to view data.

1. Risk report
2. Config. Compliance Dashboard
3. Vulnerability Dashboard

-------------------------------------------------------------------------------------------------------------------------------
(Optional - For Deploying Test setup and verifying dashboards with dummy data.) 
Note: For dashboard verification with dummy data, Elasticsearch is co-hosted (i.e. on same machine where Kibana is installed).
  Run deploy script with below option. Data can be then reindexed from RM ES, using Elasticsearch reindex APIs.
  a. Update docker-compose-dummy-elastic.yml file by adding IP of remote RM ES in whitelist section. 
  b. Update .env with rm-elastic as IP address of machine. In ACDS network IP is not working. (Don't use 127.0.0.1 or localhost)
  c. Update import_risk_manager_dashbaords.sh script has correct IP address of machine for ES, Kibana. (This can have 0.0.0.0)
  Run deploy script with below option.
  $ sh deploy_scc_rm.sh "dummy-elastic"
Once above script is completed, use reindex APIs to create indices with data.
-------------------------------------------------------------------------------------------------------------------------------
