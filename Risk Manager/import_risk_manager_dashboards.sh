#!/bin/sh

# Read Elasticsearch, Kibana info from .env
. ./.env

echo "Elasticsearch Connecting..." $ELASTICSEARCH_URL
elastic_response=$(curl -k -o /dev/null -L -s -w "%{http_code}\n" -u $ELASTICSEARCH_USERNAME:$ELASTICSEARCH_PASSWORD $ELASTICSEARCH_URL)
if [ $elastic_response != "200" ]; then
    echo "Elasticsearch is not found. Response code = $elastic_response"
else
    echo "Elasticserach is working"
fi

echo "Kibana Connecting..." $KIBANA_PROTOCOL://$KIBANA_HOST:$KIBANA_PORT
kibana_response=$(curl -k -o /dev/null -L -s -w "%{http_code}\n" $KIBANA_PROTOCOL://$KIBANA_HOST:$KIBANA_PORT)
if [ $kibana_response != "200" ]; then
    echo "Kibana is not found. Response code = $kibana_response"
else
    echo "Kibana is working"
fi

echo

if [ "$kibana_response" -eq "200" ] && [ "$elastic_response" -eq "200" ]; then
    echo "Importing Dashboards into kibana..."
    dashboard_import_response=$(curl -o ./dashboard_import_response.json -s -w "%{http_code}\n" -k -u $ELASTICSEARCH_USERNAME:$ELASTICSEARCH_PASSWORD -X POST $KIBANA_PROTOCOL://$KIBANA_HOST:$KIBANA_PORT/api/saved_objects/_import?overwrite=true -H "kbn-xsrf: json" --form file=@risk_manager_dashboards.ndjson)
    if [ $dashboard_import_response != "200" ]; then
    echo "Error while importing the dashboards. Response code = $dashboard_import_response"
    echo "more details about the error can be found at ./dashboard_import_response.json"
    else
    echo "Dashboards are successfully imported. More details at ./dashboard_import_response.json"
    echo "Access in browser: " $KIBANA_PROTOCOL://$KIBANA_HOST:$KIBANA_PORT
    fi
    
else
    echo "Failed to import Dashboards because kibana or elasticsearch (or both) is not found"
fi
