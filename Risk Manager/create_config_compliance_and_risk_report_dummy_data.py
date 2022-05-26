# Creating dummy data for config. compliance and Risk Report Dashboards
# 
# 1) Creating Compliance dummy data in hierarchical format (in index scan-reports)
#   a) The script considers the first openscap record in the index indexName(passed as an argument to ComplianceDummyData constructor) as master data.
#       1. 50 - 200 rules are tested in a host. (rules are selected at random from master data)
#       2. Daily All hosts in HOSTNAMES_AND_IPS list are scanned.
#           2.1 Scans are done in 2 batches and there is a gap of timeDeltaForSecondTestOfDay(passed as an argument to createComplianceDummyData) hr between these batches. 
#       3. Scans are done daily for numberOfDays (passed as an argument to createComplianceDummyData) days. (date range is from startTime (passed as an argument to createComplianceDummyData)  to  +numberOfDays(passed as an argument to createComplianceDummyData) days)  
# 
# 2) Creating Compliance dummy data in flattened format (in index scan-compliance)
#   a) The script selects random doc from scan-compliance index as masterdoc.
#       1. Daily <nunberOfScans> (passed as argument to createScanComplianceDummydata) are done.
#       2. Scan are done for <numberOfDays> (passed as argument to createScanComplianceDummydata) Days.
# 
# 3) Creating Risk Report data
#   a) Creating risk report dummy data from risk-report index
#       1. Each report contains all hosts in HOSTNAMES_AND_IPS.
#       2. Number of days scans are done and number of reports generated daily can be send as argument to createRiskReportDummyData()
#       3. Time gap between multiple reports in a day is 1 hour. 
#   b) Creating risk report dummy data from scan-compliance index
#       1. Each report contains 80 hosts selected randomly from scan-compliance index. 
#       2. Number of days scans are done and number of reports generated daily can be send as argument to createRiskReportDummyDataFromScanCompliance()
#       3. Time gap between multiple reports in a day is 1 hour. 
#
# 4) Uncomment lines from main function to generate respective dummy data.
 

from elasticsearch import Elasticsearch
from datetime import datetime,timedelta
import random

ES_HOST = "localhost"
ES_PORT = 9400
HOSTNAMES_AND_IPS = [["rmep10","10.253.12.60"],["rmep11","10.253.12.61"],["rmep12","10.253.12.62"],["rmep13","10.253.12.63"],["rmep14","10.253.12.64"],["rmep15","10.253.12.65"],["rmep16","10.253.12.66"],["rmep17","10.253.12.67"],["rmep18","10.253.12.68"],["rmep19","10.253.12.69"]]
 
RiskReportMasterData = {
"_class": "com.acds.net.riskreport.model.EntityRuleResult",
"Risk Report ID": "ReportId-2022-02-23T09:37:37",
"Type": "Configuration compliance",
"timeStamp": "2022-02-23T09:37:37.935Z",
"Organizational Risk Score": 80.00000399999999,
"Hostname": "v-rent-0041",
"IP": "10.254.4.90",
"Rule ID": "xccdf_org.ssgproject.content_rule_prefer_64bit_os",
"Title": "Prefer to use a 64-bit Operating System when supported",
"Description": "Prefer installation of 64-bit operating systems when the CPU supports it.",
"Issue ID": "",
"Asset Criticality": "Medium",
"Zone Criticality": "Medium",
"Preparedness": "Low",
"Thread Level Risk": "Undefined",
"Calculated Asset Risk": 80.00000399999999,
"Platform": [
"#cpe_platform_machinecpe:/o:canonical:ubuntu_linux:20.04::~~lts~~~"
]
}


class DummyData:
    def __init__(self,indexName,customIdStart):
        self.indexName = indexName
        self.customId = customIdStart
        self.es = Elasticsearch(hosts=[{"host": ES_HOST, "port": ES_PORT}])
    
    def __del__(self):
        self.es.close()

    def fetchIndexData(self):
        res = self.es.search(index=self.indexName, size=1000)
        print("Got %d Hits:" % res['hits']['total']['value'])
        return res

    def removeMetaAndCloneData(self,indexData):
        tempData = []
        for hit in indexData['hits']['hits']:
            record = (hit["_source"])
            tempData.append(record)
        return tempData

    def getOpenscapMasterData(self,arr):
        for report in arr:
            if (report["scanner"][0])=="openscap":
                return report    
   
    def createNewOpenscapDoc(self,masterDoc,time,host,ip):

        stringTime = time.strftime('%Y-%m-%dT%H:%M:%S%z')
        # Replacing hostname and ip
        masterDoc["hostname"] = host
        masterDoc["ip"] = ip
        
        masterDoc["openscap_report"]["test_start_time"] = stringTime
        masterDoc["openscap_report"]["test_end_time"] = stringTime

        newRuleResultsArray = []
        
        numberOfRuleResults = random.choice(range(50,201))
        
        for i in range(numberOfRuleResults):
            random_report = random.choice(masterDoc["openscap_report"]["rule_results"])
            random_report["rule_timestamp"]=stringTime
            newRuleResultsArray.append(random_report)
        
        # Replacing rule results array
        masterDoc["openscap_report"]["rule_results"] = newRuleResultsArray
        self.customId = self.customId  + 1
        
        res = self.es.create(self.indexName, self.customId , masterDoc)
        print(res)

    def createOpenscapDummyData(self,startTime="2022-01-01T10:00:00+0530",timeDeltaForSecondTestOfDayInHours=4,numberOfDays=15):
        clonedData = []

        indexData = self.fetchIndexData()
        clonedData = self.removeMetaAndCloneData(indexData)
        
        openscapMasterData = self.getOpenscapMasterData(clonedData)
        
        timeObject = datetime.strptime(startTime,'%Y-%m-%dT%H:%M:%S%z')
        
        for i in range(numberOfDays):
            for ele in HOSTNAMES_AND_IPS:
                if HOSTNAMES_AND_IPS.index(ele) >= round(len(HOSTNAMES_AND_IPS)/2):
                    secondTestOfDay = timeObject + timedelta(hours=timeDeltaForSecondTestOfDayInHours)
                    self.createNewOpenscapDoc(openscapMasterData,secondTestOfDay,ele[0],ele[1])
                else:
                    self.createNewOpenscapDoc(openscapMasterData,timeObject,ele[0],ele[1])
            timeObject = timeObject + timedelta(days=1)
 
    def createNewRiskReportdoc(self,clonedData,time):
        stringTime = time.strftime('%Y-%m-%dT%H:%M:%S.%f%z')[:-3] + "Z"
        for hostAndIp in HOSTNAMES_AND_IPS:
            randomMasterData = random.choice(clonedData)
            randomMasterData["timeStamp"] = stringTime
            randomMasterData["Hostname"] = hostAndIp[0]
            randomMasterData["IP"] = hostAndIp[1]
            randomMasterData["Risk Report ID"] = "ReportId-" + time.strftime('%Y-%m-%dT%H:%M:%S') 
            self.customId = self.customId + 1
            res = self.es.create(self.indexName, self.customId, randomMasterData)
            print(res)

    def createRiskReportDummyData(self,startTime="2022-01-01T10:00:00.000Z",numberOfDays=15,numberOfDailyReports=6):
        clonedData = []

        indexData = self.fetchIndexData()
        clonedData = self.removeMetaAndCloneData(indexData)
        
        masterTime = startTime
        time_object = datetime.strptime(masterTime,'%Y-%m-%dT%H:%M:%S.%fZ')
        
        for i in range(numberOfDays):
        
            for j in range(1,numberOfDailyReports + 1):
                self.createNewRiskReportdoc(clonedData,time_object + timedelta(hours=j))
            
            time_object = time_object + timedelta(days=1)

    def createNewRiskReportdocFromScanCompliance(self,clonedData,time):
        stringTime = time.strftime('%Y-%m-%dT%H:%M:%S.%f%z')[:-3] + "Z"
        global RiskReportMasterData
        riskReportMasterElement = RiskReportMasterData
        
        for i in range(80):
            randomComplianceRecord = random.choice(clonedData)
            riskReportMasterElement["Risk Report ID"] = "ReportId-" + time.strftime('%Y-%m-%dT%H:%M:%S') 
            riskReportMasterElement["timeStamp"] = stringTime
            riskReportMasterElement["Hostname"] = randomComplianceRecord["Hostname"]
            riskReportMasterElement["IP"] = randomComplianceRecord["IP"]
            riskReportMasterElement["Issue ID"] = randomComplianceRecord["Rule ID"]
            riskReportMasterElement["Title"] = randomComplianceRecord["Rule Title"]
            riskReportMasterElement["Description"] = randomComplianceRecord["Rule Description"]
            # joint = ","
            # if randomComplianceRecord["Rule Ident"] != None:
            #     joint = joint.join(randomComplianceRecord["Rule Ident"])
            #     riskReportMasterElement["associatedId"] = joint
            # else:
            #     riskReportMasterElement["associatedId"] = None
            self.customId = self.customId + 1
            res = self.es.create("risk-report", self.customId, riskReportMasterElement)
            print(res)
    
    def createRiskReportDummyDataFromScanCompliance(self,startTime="2022-01-01T10:00:00.000Z",numberOfDays=15,numberOfDailyReports=3):
        clonedData = []

        indexData = self.fetchIndexData()
        clonedData = self.removeMetaAndCloneData(indexData)
        
        masterTime = startTime
        timeObject = datetime.strptime(masterTime,'%Y-%m-%dT%H:%M:%S.%fZ')
        
        for i in range(numberOfDays):
            for j in range(1,numberOfDailyReports + 1):
                self.createNewRiskReportdocFromScanCompliance(clonedData,timeObject + timedelta(hours=j))
            
            timeObject = timeObject + timedelta(days=1)

    def createNewScanComplianceDoc(self,clonedData,time,hostName,ip):
        stringTime = time.strftime('%Y-%m-%dT%H:%M:%S%z')
        randomComplianceDoc = random.choice(clonedData)
        epochTime = time.timestamp() * 1000.0
        scanId = "scan-openscap-" + hostName + "-" + str(int(epochTime))

        randomComplianceDoc["Test Start Time"] = stringTime
        randomComplianceDoc["Rule Execution Timestamp"] = stringTime
        randomComplianceDoc["Test End Time"] = stringTime
        
        randomComplianceDoc["IP"] = ip
        randomComplianceDoc["Hostname"] = hostName
        randomComplianceDoc["Scan ID"] = scanId

        self.customId = self.customId  + 1
        
        res = self.es.create(self.indexName, self.customId , randomComplianceDoc)
        print(res)

    def createScanComplianceDummydata(self,startTime="2022-01-01T10:00:00+0530",nunberOfScans=5,numberOfDays=30):
        clonedData = []

        indexData = self.fetchIndexData()
        clonedData = self.removeMetaAndCloneData(indexData)
        
        timeObject = datetime.strptime(startTime,'%Y-%m-%dT%H:%M:%S%z')
        
        for i in range(numberOfDays):
            for j in range(1,nunberOfScans + 1 ):
                self.createNewScanComplianceDoc(clonedData,timeObject + timedelta(hours=j),HOSTNAMES_AND_IPS[j-1][0],HOSTNAMES_AND_IPS[j-1][1])
            timeObject = timeObject + timedelta(days=1)



if __name__ == "__main__":
    
    # Create compliance dummy data in hierarchical format
    # dummyOne = DummyData(indexName="scan-reports",customIdStart=0)
    # dummyOne.createOpenscapDummyData(startTime="2022-01-01T10:00:00+0530",timeDeltaForSecondTestOfDayInHours=3,numberOfDays=15)

    # Create risk report dummy data from risk-report index
    # dummyTwo = DummyData(indexName="risk-report",customIdStart=0)
    # dummyTwo.createRiskReportDummyData(startTime="2022-01-01T10:00:00.000Z",numberOfDays=15,numberOfDailyReports=6)
    
    # Create risk report dummy data from scan-compliance index
    # dummyThree = DummyData(indexName="scan-compliance",customIdStart=0)
    # dummyThree.createRiskReportDummyDataFromScanCompliance(startTime="2022-01-01T10:00:00.000Z",numberOfDays=15,numberOfDailyReports=3)
    
    # Create compliance dummy data in flattened format
    dummyFour = DummyData(indexName="scan-compliance",customIdStart=0)
    dummyFour.createScanComplianceDummydata(startTime="2022-01-01T10:00:00+0530",nunberOfScans=5,numberOfDays=30)
    


