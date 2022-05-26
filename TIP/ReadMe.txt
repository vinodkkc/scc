Pre-requisite:
Linux machine with TIP already setup.

Note:
1. While copying files somewhere else please maintain directory structure.
2. Ubuntu 20.04 VM was used for this setup.

Configurations getting added in to TIP build from this patch:
1. If the tip_scc_config_patch.sh is executed through "make" file at time of installation of MISP uncomment the #2. in the "copyCertificates" method and comment out #1.
   SSL certificates are replaced in the ThreatIntelligence/docker/docker-misp/ssl.
   
   If the tip_scc_config_patch.sh is executed manually but using "./" or "sh" do not make changes to "copyCertificates" method.

   If SSL certificates are not to be applied, please comment out "copyCertificates" method.
2. X-Frame header and Content-Security-Policy added for allowing access to particular domains.
3. Logout button style changes.
4. bootstrap-datepicker style file.
5. It will take backup of the MISP nginx file.

------------------------------------------------
Apply changes to TIP setup to access it from SCC

$ cd TIP
$ chmod +x tip_scc_config_patch.sh
$ ./tip_scc_config_patch.sh
