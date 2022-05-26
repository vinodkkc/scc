import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-constants',
  templateUrl: './app-constants.component.html',
  styleUrls: ['./app-constants.component.css']
})
export class AppConstantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public static TECHNIQUE_IDS: string = "Technique id";
  public static TOOLS: string = "Tools";
  public static EXECUTOR: string = "Executor";
  public static EXECUTION_STATUS: string = "Execution Status";
  public static PLATFORM: string = "Platform";
  public static MITRE_VERSION:string = "Mitre Version";
  public static ADD:string = "Add";
  public static ADD_MORE:string = "Add More";
  public static SUBMIT:string = "Submit";
  public static EDIT:string = "Edit";
  public static RESET:string = "Reset";
  public static ACTIONS:string = "Actions";
  public static EXPORT_CSV:string = "Export CSV";
  public static COPY_TO_CLIPBOARD:string = "Copy to Clipboard";
  public static STIX_VIEW:string = " STIX Viewer for";

  public static TECHNIQUE_ID: string = "Technique Id";
  public static OS_TYPE:string = "OS Type";
  public static DETECTION_TOOL:string = "Detection Tool";
  public static DATA_SOURCE:string = "Data Source";
  public static SUPPORT:string = "Support";
  public static ACCURACY:string = "Accuracy";
  public static ACCURACY_SCORE:string = "Accuracy Score";
  public static SCRIPT:string = "Script";

  public static FILTER_TITLE:string = "Filter Options:";
  public static SUB_FILTER_TITLE:string = "Hide/Un-hide Column:";
  public static EXPORT_JSON:string = "Upload to Matrix";
  public static SEARCH_HERE:string = "Search here";
  public static SEARCH:string = "search";
  public static OSQUERY:string = "OSQuery";
  public static ZEEK:string = "Zeek";
  public static ELASTICSIEM:string = "Elasticsiem";
  public static OTHER:string = "Other";
  public static COMMENT:string = "Comment";
  public static DETECTION:string = "detections";
  public static DETECTION_ID:string = "Detection Id";
  public static TOTAL_DETECTION:string = "total detections";

  // Mitigation
  public static MITIGATION_ID = "Mitigation Id";
  public static MITIGATION_NAME = "Mitigation Name";
  public static MITIGATION_DESCRIPTION = "Description";
  public static MITIGATION_TECH_ID = "Technique Ids";

  
}
