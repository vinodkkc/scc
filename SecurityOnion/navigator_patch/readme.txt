Navigator Configuration Changes:

1) Copy 'navigator_patch' folder on your SO.

2) Run python script 'nav_change.py' to same location where you copied Navigator Patch folder on SO.
   Command : python nav_change.py

3) Open init.sls from /opt/so/saltstack/local/salt/nginx/init.sls and change below lines:
      
  In init.sls under navigatordefaultlayer , Replace nav_layer_playbook.json path with acds default json path

    navigatordefaultlayer:
        file.managed:
            - name: /opt/so/conf/navigator/acds_nav_layer.json  // Modified Line
            - source: salt://nginx/files/acds_nav_layer.json    // Modified Line
			
    In init.sls under  ATT&CK Navigator binds , Replace nav_layer_playbook.json with acds json 
	
     /opt/so/conf/navigator/acds_nav_layer.json:/opt/socore/html/navigator/assets/acds_nav_layer.json:ro
     
4) Run
  $ sudo so-nginx-restart


Note - 
1) It is recommended to call nav_change.py script on fresh setup
2) This script will show ACDS Navigator Layer (acds_nav_layer.json) if script is called first time.
3) If this script is called after applying any custom navigator layer changes, This script will refer the techniques array as it is. i.e the techniques aaray should have -> 
  "showSubtechniques": true
	 
	 

