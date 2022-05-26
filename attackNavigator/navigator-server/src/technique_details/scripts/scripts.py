from selenium import webdriver
import time
import os
from datetime import datetime
import pandas as pd
from pyattck import Attck
import json
from ..models import Tactic, Technique, Attacks, Detection, Mitigation, \
    TechniqueMitigation, TechniqueAttack   # , TechniqueDetection

attack = Attck()
# DEFAULT_COLOR = str(Detection.objects.first().color)
PARTIAL_FILL = "#FF8000"


class ExportToJson:

    def __init__(self):
        pass

    # This function currently not in use
    def upload_to_navigator(self, jsonfile):
        # Path of executable chrome driver (need to download driver and provide exe path here)
        cwd = os.getcwd()
        path_to_json = os.path.join(cwd, "data/mitre_attack_json.json")
        PATH = "C:\\Program Files (x86)\\chromedriver.exe"
        jsonfile = json.dumps(jsonfile, indent=4)

        try:
            # Creating a Chrome driver object
            options = webdriver.ChromeOptions()
            options.add_experimental_option("excludeSwitches", ["enable-logging"])
            driver = webdriver.Chrome(options=options, executable_path=PATH)

            driver.maximize_window()
            driver.get("https://mitre-attack.github.io/attack-navigator/")

            driver.find_element_by_xpath("//*[contains(text(), 'Open Existing Layer')]").click()
            time.sleep(2)

            element = driver.find_element_by_id('uploader')
            # element.send_keys("C:\\Users\\akash_gaurav\\Downloads\\detection_jsonfile.json")
            element.send_keys(path_to_json)
            # time.sleep(15)
            # Closing the browser tab
            # driver.close()

        except Exception as e:
            raise e

    def sample_technique_func(self):
        """return Attributes of techniques used in json file

        """
        return {
            "techniqueID": "",
            "tactic": "",
            "color": "",
            "comment": {},
            # "comment": {
            #     "attack": {"pre-requisite": [], "scripts": []},
            #     "detection": []
            # },
            "enabled": True,
            "metadata": [],
            "showSubtechniques": True
        }

    def export_json(self, json_file):
        """ This file is used to export directory into JSON format

        Parameters
        ----------
        json_file : Python dictionary

        Returns
        -------
        No Data
        """

        sample_dict = {}
        try:

            # Loading sample json and convert it into python dictionary
            sample_json = open("data/sample.json", "r")
            sample_dict = json.load(sample_json)
            sample_json.close()
        except FileNotFoundError as f:
            print("FileNotFoundError: ", f)
            raise
        except Exception as e:
            print("Exception: ", e)

        for i in range(len(json_file)):
            json_file[i]['comment'] = str(json_file[i]['comment'])

        sample_dict['techniques'] = json_file

        # write json file
        timestamp = datetime.now().strftime("%d%m%Y%H%M%S")
        file_location = 'static/detection_navigator_json' + timestamp + '.json'

        with open(file_location, 'w', encoding='utf-8') as f:
            json.dump(sample_dict, f, indent=4)

        return timestamp

    def attack_json(self):
        attack_df = pd.DataFrame(list(Attacks.objects.all().values()))

    def all_data_json(self):
        technique_df = pd.DataFrame(list(Technique.objects.all().values()))

    def detection_json(self, version):
        detection_utility = []
        tech_dec_map = {}
        detection_df = pd.DataFrame(list(Detection.objects.all().values()))
        # tec_dec_df = pd.DataFrame(list(TechniqueDetection.objects.all().values()))
        Detection.objects.filter(support="yes")
        if version.lower() == "all":
            technique_df = pd.DataFrame(list(Technique.objects.all().values()))
        else:
            technique_df = pd.DataFrame(list(Technique.objects.filter(mitre_version=version).values()))
        tactic_df = pd.DataFrame(list(Tactic.objects.all().values()))

        for index, row in detection_df.iterrows():
            if row['sub_technique_id'] in list(technique_df['combine_tech_id']):
                # temp_tech_id = row['sub_technique_id'].split('.')[0]
                temp_tid = technique_df[technique_df['combine_tech_id'] == row['sub_technique_id']]['tactic_id'].iloc[0]

                for t in temp_tid.split(','):
                    temp_tac_name = tactic_df[tactic_df['tactic_id'] == t]['tactic_name'].iloc[0]

                    ################################# Old ###############################

                    # sample_dict = self.sample_technique_func()
                    # sample_dict['techniqueID'] = key
                    # temp_tactic = temp_tac_name.lower().replace(" ", "-")
                    # # temp_tactic = tactic.name.lower().replace(" ", "-")
                    # sample_dict['tactic'] = temp_tactic
                    # sample_dict['comment'] = temp_script_list
                    # sample_dict['color'] = DEFAULT_COLOR
                    # detection_utility.append(sample_dict)

                    ##################################### Updated ###########################

                    sample_dict = self.sample_technique_func()
                    sample_dict['techniqueID'] = row['sub_technique_id']
                    temp_tactic = temp_tac_name.lower().replace(" ", "-")
                    sample_dict['tactic'] = temp_tactic
                    sample_dict['comment'] = row['script']
                    sample_dict['color'] = row['color']
                    detection_utility.append(sample_dict)

        json_path = self.export_json(detection_utility)

        return json_path


class DataSource:

    def __init__(self):
        pass

    def unique_datasource(self):
        unique_ds_list = []
        ds_list = Technique.objects.values_list('data_source', flat=True)
        for ds in ds_list:
            if ds:
                ds = ds[1:-1]
                for elem in ds.split(","):
                    elem = elem.strip('"')
                    if elem not in unique_ds_list:
                        unique_ds_list.append(elem)

        return {"unique_ds_list": unique_ds_list}


class DashboardCount:

    def __init__(self):
        pass

    def all_items_count(self):
        data_dic = {}
        technique = Technique.objects.all().count()
        detection = Detection.objects.all().count()
        attack = Attacks.objects.all().count()

        detection_support = Detection.objects.filter(support="yes").count()
        attack_support = Attacks.objects.filter(support="yes").count()

        data_dic["technique"] = technique
        data_dic["detection"] = detection
        data_dic["attack"] = attack
        data_dic["detection_support"] = detection_support
        data_dic["attack_support"] = attack_support

        return data_dic


def main():
    jsonObj = ExportToJson()
    # jsonObj.attack_json()
    jsonObj.detection_json()
    # jsonObj.all_data_json()


if __name__ == '__main__':
    main()
