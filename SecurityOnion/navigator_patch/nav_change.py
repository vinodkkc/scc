import os
import shutil
import json

NAVIGATOR_CONFIG_LOCAL_PATH  = r"/opt/so/saltstack/local/salt/nginx/files/navigator_config.json"
NAVIGATOR_CONFIG_DEFAULT = "navigator_config.json"
DEFAULT_PLAYBOOK_LAYER_FILE_PATH ="/opt/so/conf/navigator/nav_layer_playbook.json"
ACDS_NAV_LAYER_FILE_PATH = "/opt/so/conf/navigator/acds_nav_layer.json"
NGINX_DEFAULT_NAV_LAYER_CONFIG_PATH = "//nginx/files/nav_layer_playbook.json"
NGINX_ACDS_NAV_LAYER_CONFIG_PATH = "//nginx/files/acds_nav_layer.json"
NAV_LAYER_PATH_REPLACE = DEFAULT_PLAYBOOK_LAYER_FILE_PATH + ":" + "/opt/socore/html/navigator/assets/playbook.json:ro"
ACDS_NAV_PATH = ACDS_NAV_LAYER_FILE_PATH + ":" + "/opt/socore/html/navigator/assets/acds_nav_layer.json:ro"
INIT_SLS_DEFAULT = r"init.sls"
SALT_INIT_SLS_PATH = r"/opt/so/saltstack/local/salt/nginx/init.sls"
ACDS_NAV_LAYER_DEFAULT ="acds_nav_layer.json"
SALT_ACDS_NAV_PATH = r"/opt/so/saltstack/local/salt/nginx/files/acds_nav_layer.json"

class NavigatorHelper:

    # Check Navigator config json present or not and added required changes

    def saltNavigatorConfig(self):
        
        if os.path.isfile(NAVIGATOR_CONFIG_LOCAL_PATH):
            os.remove(NAVIGATOR_CONFIG_LOCAL_PATH)
            shutil.copyfile(NAVIGATOR_CONFIG_DEFAULT,NAVIGATOR_CONFIG_LOCAL_PATH)
        else:
            shutil.copyfile(NAVIGATOR_CONFIG_DEFAULT, NAVIGATOR_CONFIG_LOCAL_PATH)

    # Replace / Merge init.sls with required changes

    def initSlsMerge(self):

        if os.path.isfile(SALT_INIT_SLS_PATH):
            file = open(SALT_INIT_SLS_PATH,'r')
            replacement = ""
            for line in file:
                line = line.rstrip()
                changes = line.replace(DEFAULT_PLAYBOOK_LAYER_FILE_PATH,ACDS_NAV_LAYER_FILE_PATH)
                replacement = replacement + changes + "\n"

            for line in file:
                line = line.rstrip()
                changes = line.replace(NGINX_DEFAULT_NAV_LAYER_CONFIG_PATH, NGINX_ACDS_NAV_LAYER_CONFIG_PATH)
                replacement = replacement + changes + "\n"

            for line in file:
                line = line.rstrip()
                changes = line.replace(NAV_LAYER_PATH_REPLACE, ACDS_NAV_PATH)
                replacement = replacement + changes + "\n"

            file.close()
            fout = open(SALT_INIT_SLS_PATH,'w')
            fout.write(replacement)
            fout.close()
        else:
            shutil.copyfile(INIT_SLS_DEFAULT, SALT_INIT_SLS_PATH)
    
    # Merge Salt ACDS JSON technique array into default ACDS JSON file and copy default ACDS JSON into Salt 

    def acdsJsonMerge(self):

        if os.path.isfile(SALT_ACDS_NAV_PATH):
            salt_acds_file = open(SALT_ACDS_NAV_PATH)
            salt_acds_dataload = json.load(salt_acds_file)
            default_acds_file = open(ACDS_NAV_LAYER_DEFAULT)
            acds_dataload = json.load(default_acds_file)
            acds_dataload['techniques'] = salt_acds_dataload['techniques']
            json.dump(acds_dataload, open(ACDS_NAV_LAYER_DEFAULT,"w"))

        shutil.copyfile(ACDS_NAV_LAYER_DEFAULT,SALT_ACDS_NAV_PATH)
    
conf=NavigatorHelper()
conf.saltNavigatorConfig()
#conf.initSlsMerge()
conf.acdsJsonMerge()
