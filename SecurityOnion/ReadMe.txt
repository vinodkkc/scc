Copy SecurityOnion folder on SO machine(master node).

==================================================================================================================
1. Update SO for embedding SO pages/dashbaords in SCC iframe(s).

i) Update SO to use FQDN (Post installation).

	Update url_base property in /opt/so/saltstack/local/pillar/global.sls

	For e.g. 
	url_base: 'scc-so.acds.net.in'

	$ sudo salt \* state.highstate
	Reference:
	https://docs.securityonion.net/en/2.3/url-base.html?highlight=base%20url%20change 

ii) Update Content security policy on Security Onion.
	$ sudo cp /opt/so/saltstack/default/salt/nginx/etc/nginx.conf /opt/so/saltstack/local/salt/nginx/etc/nginx.conf

	Add *.acds.net.in in /opt/so/saltstack/local/salt/nginx/etc/nginx.conf by replacing line which has Content-Security-Policy.
	For e.g.
	-		add_header 	Content-Security-Policy     "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: wss:; frame-ancestors 'self'";
	+		add_header 	Content-Security-Policy     "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob: wss:; frame-ancestors 'self' *.acds.net.in";

iii). Apply ACDS certificates on Security Onion - which will allow embedding SO pages/dashbaords in SCC iframe(s).

	$ sudo sh apply_certs.sh

==================================================================================================================
Configure SecurityOnion for SO-SOAR integration.
Set ACDS SOAR URL and credentials for SOAR to access SOAR APIs.

1. Add json config object in menu.actions.json file located at "/opt/so/saltstack/local/salt/soc/files/soc".

	{
		"name":"acdsSoarURL",
		"description":"ACDS SOAR URL",
		"icon":"",
		"target":"_blank",
		"links":[
			"<ACDS_SOAR_URL>",
			"<SOAR_USER_EMAIL>",
			"<SOAR_USER_PASSWORD>"
		]
	}

	For e.g.:
	{
		"name":"acdsSoarURL",
		"description":"ACDS SOAR URL",
		"icon":"",
		"target":"_blank",
		"links":[
			"https://thehive.acds.net.in/",
			"analyst1@acds.net.in",
			"secret"
		]
	}

NOTE:
1) name, description, icon, target keys should have exact values as shown above.
2) Please use credentials of SOAR user who is admin(admin rights). 
	As these credentials are used for SOAR case/alert creation - user field in SOAR will have name of admin.
3) There is no RBAC support in this release.

2. Run below command to update SOAR configuration:

	Command: "sudo so-soc-restart"

3. Step 2 reverts custom changes from soc_patch.sh applied earlier. To reapply the changes run below command.

	Command: sh soc_patch.sh
