#Creating dummy data for config. compliance dashboards
# The script considers the first openscap record in the index "scan-reports" as master data.
# The script creates data where 
#    1. 50 - 200 rules are tested in a host. (rules are selected at random from master data)
#    2. Daily 10 hosts are scanned. (those 10 hostnames and ips are stored in list "HOSTNAMES_AND_IPS")
#       2.1 Scans are done in batches of 5 hosts and there is a gap of 4hr between these batches. 
#    3. Scans are done daily for 15 days. (date range is from timestamp in master data to -15 days)  
#    4. Total 150 records are created with ids in range 1 - 150 in elasticsearch


from elasticsearch import Elasticsearch
from datetime import datetime,timedelta
import random

ES_HOST = "10.254.4.84"
ES_PORT = 9200

es = Elasticsearch(hosts=[{"host": ES_HOST, "port": ES_PORT}])
print(es)
custom_id = 0

HOSTNAMES_AND_IPS = [["rmep10","10.253.12.60"],["rmep11","10.253.12.61"],["rmep12","10.253.12.62"],["rmep13","10.253.12.63"],["rmep14","10.253.12.64"],["rmep15","10.253.12.65"],["rmep16","10.253.12.66"],["rmep17","10.253.12.67"],["rmep18","10.253.12.68"],["rmep19","10.253.12.69"]]


def fetchIndexData():
    res = es.search(index="scan-reports", size=1000)
    print("Got %d Hits:" % res['hits']['total']['value'])
    return res

def removeMetaAndCloneData(indexData):
    tempData = []
    for hit in indexData['hits']['hits']:
        # print(hit)
        record = (hit["_source"])
        tempData.append(record)
    return tempData
              
def getOpenscapMasterData(arr):
    for report in arr:
        if (report["scanner"][0])=="openscap":
            return report
            
def createNewOpenscapDoc(masterDoc,time,host,ip):
    global custom_id
    # Replacing hostname and ip
    masterDoc["hostname"] = host
    masterDoc["ip"] = ip
    
    masterDoc["openscap_report"]["test_start_time"] = time
    masterDoc["openscap_report"]["test_end_time"] = time

    newRuleResultsArray = []
    
    numberOfRuleResults = random.choice(range(50,201))
    
    for i in range(numberOfRuleResults):
        random_report = random.choice(masterDoc["openscap_report"]["rule_results"])
        random_report["rule_timestamp"]=time
        newRuleResultsArray.append(random_report)
    
    # Replacing rule results array
    masterDoc["openscap_report"]["rule_results"] = newRuleResultsArray
    custom_id = custom_id + 1
    
    res = es.create("scan-reports", custom_id, masterDoc)
    print(res)
    

if __name__ == "__main__":
    res = []
    clonedData = []

    indexData = fetchIndexData()
    clonedData = removeMetaAndCloneData(indexData)
    
    openscapMasterData = getOpenscapMasterData(clonedData)
    
    masterTime = openscapMasterData["openscap_report"]["test_start_time"]
    time_object = datetime.strptime(masterTime,'%Y-%m-%dT%H:%M:%S')
    
    for i in range(15):
        for ele in HOSTNAMES_AND_IPS:
            if HOSTNAMES_AND_IPS.index(ele) >= round(len(HOSTNAMES_AND_IPS)/2):
                secondTestOfDay = time_object + timedelta(hours=4)
                createNewOpenscapDoc(openscapMasterData,secondTestOfDay,ele[0],ele[1])
            else:
                createNewOpenscapDoc(openscapMasterData,time_object,ele[0],ele[1])
        time_object = time_object - timedelta(days=1)

    es.close()

