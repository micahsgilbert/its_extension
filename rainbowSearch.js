const data = [
  {
    "name": "IT Tools",
    "href": "https://ittools.ucsd.edu/"
  },
  {
    "name": "MailUPD",
    "href": "https://mailupd.ucsd.edu/"
  },
  {
    "name": "SAL",
    "href": "https://sal.ucsd.edu/"
  },
  {
    "name": "Google Admin",
    "href": "https://admin.google.com/"
  },
  {
    "name": "ALTNG",
    "href": "https://altng.ucsd.edu/"
  },
  {
    "name": "DSA Email Lookup",
    "href": "https://iam.ucsd.edu/dsasearch/dsaSearchByEmail"
  },
  {
    "name": "DSA Dept Lookup",
    "href": "https://iam.ucsd.edu/dsasearch/deptList"
  },
  {
    "name": "Lastpass Admin",
    "href": "https://admin.lastpass.com/"
  },
  {
    "name": "Zoom Admin",
    "href": "https://ucsd.zoom.us/account/user#/"
  },
  {
    "name": "Blink Directory",
    "href": "https://itsweb.ucsd.edu/directory/"
  },
  {
    "name": "Classroom Calls",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13116030/Responding+to+Classroom+Support+Calls"
  },
  {
    "name": "GA Classrooms",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/306053141/General+Assignment+Campus+Classroom+Information+ITS-ClassroomSupport+v2023"
  },
  {
    "name": "Classroom Lookup",
    "href": "https://icl.ucsd.it/"
  },
  {
    "name": "Classroom Map",
    "href": "https://sheeptester.github.io/uxdy/classrooms/"
  },
  {
    "name": "Podcast Info",
    "href": "https://podcast.ucsd.edu/info/"
  },
  {
    "name": "Lab Lookup",
    "href": "https://lablookup.ucsd.edu/"
  },
  {
    "name": "Lab Software",
    "href": "https://its-key-srv.ucsd.edu/software"
  },
  {
    "name": "ITS-EIS",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13114104/ITS+Educational+Infrastructure+Systems+formerly+ITS+Educational+Computing+Environments"
  },
  {
    "name": "EIS Labs",
    "href": "https://docs.google.com/spreadsheets/d/1oa8SYsrBxflwqXxHj8NwHQnL4aRIpCs4RSNyTYQZTCQ"
  },
  {
    "name": "CINFO",
    "href": "https://cinfo.ucsd.edu/"
  },
  {
    "name": "Duo Admin",
    "href": "https://admin-ce13a1a7.duosecurity.com"
  },
  {
    "name": "Duo Admin (Health)",
    "href": "https://admin-5d6fd827.duosecurity.com/"
  },
  {
    "name": "Starfish",
    "href": "https://kona.ucsd.edu/starfish"
  },
  {
    "name": "Virus Total",
    "href": "https://www.virustotal.com/"
  },
  {
    "name": "Border Block",
    "href": "https://netapps-web2.ucsd.edu/secure/blocked-hosts/search.pl"
  },
  {
    "name": "ISE",
    "href": "https://m-ise-admin.ucsd.edu/"
  },
  {
    "name": "DNAC",
    "href": "https://its-dnac.ucsd.edu/dna/home"
  },
  {
    "name": "Campus Devices",
    "href": "https://netapps-web.ucsd.edu/cgi-bin/etherreg/wirelessform.pl"
  },
  {
    "name": "ResNet Devices",
    "href": "https://mydevices.ucsd.edu/"
  },
  {
    "name": "IP Space",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/TWT/pages/17072885/IPspace"
  },
  {
    "name": "Hostmaint",
    "href": "https://hostmaint.ucsd.edu/ui/"
  },
  {
    "name": "NetMRI",
    "href": "https://act-netmri.ucsd.edu"
  },
  {
    "name": "Splunk",
    "href": "https://its-splunk.ucsd.edu"
  },
  {
    "name": "ArpQ",
    "href": "https://netapps-web.ucsd.edu/secure/tools/arpq"
  },
  {
    "name": "Intermapper",
    "href": "https://intermapper.ucsd.edu"
  },
  {
    "name": "CSR Form",
    "href": "https://act.ucsd.edu/telecom/csr"
  },
  {
    "name": "CSR Status",
    "href": "https://act.ucsd.edu/telecom/csr/status"
  },
  {
    "name": "TMS Instructions",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13114689/TMS+ITS-InstallationRepair"
  },
  {
    "name": "TMS Search",
    "href": "https://actfp.ucsd.edu/secure/TMS_module/tms_module.pl"
  },
  {
    "name": "Phone Switch",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13114110/Phone+Switch"
  },
  {
    "name": "Collab",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/overview"
  },
  {
    "name": "Talkdesk",
    "href": "https://ucsd-its-sd.mytalkdesk.com/"
  },
  {
    "name": "Status Page",
    "href": "https://status.ucsd.edu/"
  },
  {
    "name": "When I Work",
    "href": "https://appx.wheniwork.com/"
  },
  {
    "name": "Ecotime",
    "href": "https://ecotimecampus.ucsd.edu/"
  },
  {
    "name": "Business Units",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13113005/ITS+Business+Units"
  },
  {
    "name": "Health Matrix",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13115634/Health+Information+Services+HIS+and+ITS+Support+Matrix+for+Customers+in+the+Healthcare+OU"
  },
  {
    "name": "Field Support Users",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13114950/Groups+Supported+by+Field+Support"
  },
  {
    "name": "Phone Template",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/13114270/Phone+Response+Template"
  },
  {
    "name": "Email Templates",
    "href": "https://ucsdcollab.atlassian.net/wiki/spaces/CKB/pages/230786164/Email+Templates+Canned+Responses"
  }
]

// just compare query to each name (both lowercase without spaces)

window.addEventListener("keydown", event => {
  if (event.altKey && event.key == "r") {
    const query = window.prompt("What to open?")
    for (let entry of data) {
      if (entry.name.toLowerCase().replace(" ", "") == query.toLowerCase().replace(" ","")) {
        window.open(entry.href, '_blank').focus();
      }
    }
  }
})

