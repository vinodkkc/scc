SHELL = /bin/sh

BUILD=v1
BUILD_DIR=build
DOCKER_DIR=scc-docker
# TMP_DOCKER_DIR=scc-tmp-docker
OUT_DIR=release
SCC_TAR=SCC_v1.tar.gz

ACDS_REGISTRY=docker.acds.net.in/scc
ifneq ($(BUILD_NUMBER),)
ACDS_SCC_VERSION=$(BUILD_NUMBER)
else
ACDS_SCC_VERSION=latest
endif


REACT_APP_HOST=scc-dev.acds.net.in
REACT_APP_BASE_PATH=/scc
REACT_APP_SERVER_BASE_PATH=https://scc-dev.acds.net.in:8443/scc
REACT_APP_ATTACK_NAVIGATOR_URL=https://securityonionscc.acds.net.in/navigator/
REACT_APP_NETWORK_DASHBOARD_URL="https://securityonionscc.acds.net.in/kibana/app/dashboards\#/view/04ff3ef0-6ea4-11ea-9266-1fd14ca6af34?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-24h%2Cto%3Anow))&show-time-filter=true"
REACT_APP_ENDPOINT_DASHBOARD_URL="https://securityonionscc.acds.net.in/kibana/app/dashboards\#/view/92e63cc0-6ec0-11ea-9266-1fd14ca6af34?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-24h%2Cto%3Anow))&show-time-filter=true"
REACT_APP_MISP_URL=https://scc-tip.acds.net.in/events/index
REACT_APP_SO_ALERTS_URL="https://securityonionscc.acds.net.in/\#/alerts?embed=true&"
REACT_APP_RISK_REPORT_URL="https://scc-rm.acds.net.in:5601/app/dashboards\#/view/2f4a3750-859f-11ec-9d61-271b2a94009b?embed=true&_g=(filters%3A!())"
REACT_APP_CONFIG_COMPLIANCE_REPORT_URL="https://scc-rm.acds.net.in:5601/app/dashboards\#/view/e02acee0-8581-11ec-9d61-271b2a94009b?embed=true&_g=(filters%3A!())&show-time-filter=true"
REACT_APP_VULNERABILITY_REPORT_URL="https://scc-rm.acds.net.in:5601/app/dashboards\#/view/7c7a7260-859a-11ec-9d61-271b2a94009b?embed=true&_g=(filters%3A!())&show-time-filter=true"
REACT_APP_POLICY_MANAGER_API_SERVER=https://scc-pm.acds.net.in:883/PolicyManager
REACT_APP_SOAR_URL=https://thehive.acds.net.in:8443/
REACT_APP_LOGIN_TIMEOUT=30

ifeq ($(env), --prod)
	ENV_FILE:='.env.prod'
else
	ENV_FILE:='.env'
endif

all: clean build

clean:
	sudo rm -rf $(BUILD_DIR);
	# [ -e $(TMP_DOCKER_DIR)/docker-compose.yml ] && ( cd $(TMP_DOCKER_DIR); docker-compose down -v --rmi all --remove-orphans; echo SUCCESS ) || echo "No docker-compose.yml to clean"
	# # Remove temp docker folder
	# sudo rm -rf $(TMP_DOCKER_DIR)

	echo $(env)
	if [ "$(env)" = "--prod" ]; then \
		sudo docker-compose -f docker-compose.yml -f docker-compose-scc.prod.yml --env-file $(DOCKER_DIR)/.env.prod down -v --rmi all --remove-orphans; \
	else \
		sudo docker-compose down -v --rmi local --remove-orphans; \
	fi

build:
	echo "Starting SCC build #${BUILD}"
	mkdir -p $(BUILD_DIR); 
	mkdir -p $(OUT_DIR);

	# cp -a $(DOCKER_DIR) $(TMP_DOCKER_DIR); 
	# cd $(TMP_DOCKER_DIR);  docker-compose up -d

	echo $(ENV_FILE)
	sed -i '/REACT_APP_HOST/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_HOST=$(REACT_APP_HOST) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_BASE_PATH/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_BASE_PATH=$(REACT_APP_BASE_PATH) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_SERVER_BASE_PATH/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_SERVER_BASE_PATH=$(REACT_APP_SERVER_BASE_PATH) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_ATTACK_NAVIGATOR_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_ATTACK_NAVIGATOR_URL=$(REACT_APP_ATTACK_NAVIGATOR_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_NETWORK_DASHBOARD_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_NETWORK_DASHBOARD_URL=$(REACT_APP_NETWORK_DASHBOARD_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_ENDPOINT_DASHBOARD_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_ENDPOINT_DASHBOARD_URL=$(REACT_APP_ENDPOINT_DASHBOARD_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_MISP_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_MISP_URL=$(REACT_APP_MISP_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_SO_ALERTS_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_SO_ALERTS_URL=$(REACT_APP_SO_ALERTS_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_RISK_REPORT_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_RISK_REPORT_URL=$(REACT_APP_RISK_REPORT_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_CONFIG_COMPLIANCE_REPORT_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_CONFIG_COMPLIANCE_REPORT_URL=$(REACT_APP_CONFIG_COMPLIANCE_REPORT_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_VULNERABILITY_REPORT_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_VULNERABILITY_REPORT_URL=$(REACT_APP_VULNERABILITY_REPORT_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_POLICY_MANAGER_API_SERVER/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_POLICY_MANAGER_API_SERVER=$(REACT_APP_POLICY_MANAGER_API_SERVER) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_SOAR_URL/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_SOAR_URL=$(REACT_APP_SOAR_URL) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/REACT_APP_LOGIN_TIMEOUT/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo REACT_APP_LOGIN_TIMEOUT=$(REACT_APP_LOGIN_TIMEOUT) >> $(DOCKER_DIR)/$(ENV_FILE)
	sed -i '/ACDS_SCC_VERSION/c\' $(DOCKER_DIR)/$(ENV_FILE)
	echo ACDS_SCC_VERSION=$(ACDS_SCC_VERSION) >> $(DOCKER_DIR)/$(ENV_FILE)


	if [ "$(env)" = "--prod" ]; then \
		sudo docker-compose -f docker-compose.yml -f docker-compose-scc.prod.yml --env-file $(DOCKER_DIR)/.env.prod up -d --build; \
	else \
		# dev environment; \
		sudo docker-compose up -d --build; \
	fi

	# sleep 1m

	if [ "$(env)" = "--prod" ]; then \
		(sudo docker image save $$(sudo docker image ls | grep scc_db | awk '{print $$3}') -o $(BUILD_DIR)/scc_db.tar scc_db:v1); \
		(sudo docker image save $$(sudo docker image ls | grep scc_adminer | awk '{print $$3}') -o $(BUILD_DIR)/scc_adminer.tar scc_adminer:v1); \
		(sudo docker image save $$(sudo docker image ls | grep scc_app1 | awk '{print $$3}') -o $(BUILD_DIR)/scc_app1.tar scc_app1:v1); \
		(sudo docker image save $$(sudo docker image ls | grep scc_web | awk '{print $$3}') -o $(BUILD_DIR)/scc_web.tar scc_web:v1); \
		# Bundle docker compose for deployment.; \
		cd $(BUILD_DIR); \sudo tar -czvf $(SCC_TAR) *.tar; \cd ..;\
		sudo rm -rf $(OUT_DIR)/*; \
		mv $(BUILD_DIR)/*.tar.gz $(OUT_DIR)/; \
		cp -r $(DOCKER_DIR)/deploy_scc_docker_registry.sh $(DOCKER_DIR)/deploy_scc.sh $(DOCKER_DIR)/$(ENV_FILE) $(DOCKER_DIR)/docker-compose.yml $(DOCKER_DIR)/docker-compose.local.yml $(DOCKER_DIR)/.env.prod $(DOCKER_DIR)/ssl $(OUT_DIR)/; \
		mkdir -p $(OUT_DIR)/scc-db; \cp -r scc-db/scc.sql $(OUT_DIR)/scc-db/scc.sql; \cp -r ../Risk\ Manager $(OUT_DIR)/; \cp -r ../SecurityOnion $(OUT_DIR)/; \cp -r ../TIP $(OUT_DIR)/; \
		echo "SCC deployment bundle generated successfully."; \
		cd $(BUILD_DIR); \sudo rm *.tar; \
		# sudo rm -rf $(SCC_TMP_DIR); \
	fi

docker-push-image:
	if [ "$(env)" = "--prod" ]; then \
		docker tag scc_db:v1 $(ACDS_REGISTRY)/scc_db:$(ACDS_SCC_VERSION); \
		docker push $(ACDS_REGISTRY)/scc_db:$(ACDS_SCC_VERSION); \
		docker tag scc_adminer:v1 $(ACDS_REGISTRY)/scc_adminer:$(ACDS_SCC_VERSION); \
		docker push $(ACDS_REGISTRY)/scc_adminer:$(ACDS_SCC_VERSION); \
		docker tag scc_app1:v1 $(ACDS_REGISTRY)/scc_app1:$(ACDS_SCC_VERSION); \
		docker push $(ACDS_REGISTRY)/scc_app1:$(ACDS_SCC_VERSION); \
		docker tag scc_web:v1 $(ACDS_REGISTRY)/scc_web:$(ACDS_SCC_VERSION); \
		docker push $(ACDS_REGISTRY)/scc_web:$(ACDS_SCC_VERSION); \
	fi

cleanall:
	# stop all containers
	( sudo docker container stop $$(sudo docker container ls | grep scc | awk '{print $$1}') ) && ( echo "Stopped Containers" ) 
	# remove all containers
	( sudo docker container rm $$(sudo docker container ls -a | grep scc | awk '{print $$1}') ) && ( echo "Removed Containers" ) 
	# remove all images
	( sudo docker rmi -f $$(sudo docker images | grep scc | awk '{print $$3}') ) && ( echo "Removed Images" ) 
	# remove all volumes
	( sudo docker volume rm $$(sudo docker volume ls | grep scc | awk '{print $$2}') ) && ( echo "Remove Volumes" ) 


.PHONY: clean cleanall build all