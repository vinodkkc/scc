import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Detection, DetectionAdapter } from 'src/app/models/detection-model';

@Component({
  selector: 'app-data-crud',
  templateUrl: './data-crud.component.html',
  styleUrls: ['./data-crud.component.css']
})
export class DataCrudComponent implements OnInit {

  constructor(
    private service: CrudoperationService,
    private modalService: NgbModal,
    private jsonpipe: JsonPipe,
    private adapter: DetectionAdapter
  ) { }

  ngOnInit(): void {
  }

  async onFormSubmit(content: any, action: string, techIdInfo: any, pKey: any, inputArray: any, isTechIdDisabled: boolean) {
    let checkbx = "no";
    let accuracy = 0;
    let attr = null;
    let userinput = null;
    let color = null;
    userinput = Number(content.controls["accuracyScore"].value);
    if (userinput) {
      accuracy = userinput
    }
    attr = ` {"accuracy_score": ${accuracy} } `;

    if (accuracy >= 90) {
      color = "#008000";
      checkbx = "yes";
    }
    else if (accuracy < 90 && accuracy >= 80) {
      color = "#0000FF";
      checkbx = "yes";
    }
    else if (accuracy < 80 && accuracy >= 50) {
      color = "#800080";
      checkbx = "yes";
    }
    else if (accuracy < 50 && accuracy > 0) {
      color = "#FFA500";
      checkbx = "yes";
    }
    else {
      color = "#FFFFFF";
      checkbx = "no";
    }

    let addDetectionJson = {
      detectionId: "",
      script: content.controls["jsondata"].value,
      osType: content.controls["osType"].value,
      comment: content.controls["comment"].value,
      detectionTool: content.controls["detectionTool"].value,
      elasticsiem: content.controls["elasticsiem"].value,
      zeek: content.controls["zeek"].value,
      osquery: content.controls["osquery"].value,
      other: content.controls["other"].value,
      dataSource: content.controls["dataSource"].value,
      attributes: attr,
      support: checkbx,
      color: color,
      sigma: "",
      subTechniqueId: techIdInfo[0],
    }

    if (addDetectionJson.dataSource) {
      addDetectionJson.dataSource = addDetectionJson.dataSource.join()
    }
    if (addDetectionJson.osType && content.valid) {
      this.createJSON(addDetectionJson, content, action, inputArray, isTechIdDisabled);
      addDetectionJson.script = content.controls["jsondata"].value;
    }
    if (techIdInfo.length != 0 && addDetectionJson.script && this.IsJsonString(addDetectionJson.script)) {
      if (action === "Edit") {
        addDetectionJson.detectionId = pKey;
        let detObj = this.adapter.getDetectionObject(addDetectionJson);
        await this.updateDetection(detObj);
      } else {
        let detObj = this.adapter.getDetectionObject(addDetectionJson)
        await this.addDetection(detObj);
      }
    } else {
      alert("Please add valid JSON data.");
    }
  }

  IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  createJSON(script: any, content: any, action: any, inputArrayVar: any[], isTechIdDisabled: boolean) {
    let osQueryArray: string[] = [];
    let elasticsiemArray: any[] = [];
    let zeekArray: any[] = [];
    let otherArray: any[] = [];
    let inputArgsArray: any[] = []
    let inputArray: any[] = [];
    let osqueryStr = script.osquery;
    let extensionsObject: any = {};
    if (osqueryStr) {
      let osqueryArr = osqueryStr.split("\n");
      osqueryArr.forEach((element: string, index: number) => {
        element = element.replace(/(?:\\)/g, '\\')
        osqueryArr[index] = element
        osQueryArray.push(element);
      });
    } else {
      osQueryArray = [];
    }
    let otherStr = script.other;

    if (otherStr) {
      let otherArr = otherStr.split(",");

      otherArr.forEach((element: any) => {
        otherArray.push(element);
      });
    } else {
      otherArray = [];
    }

    let elasticsiemStr = script.elasticsiem;

    if (elasticsiemStr) {
      let elasticsiemArr = elasticsiemStr.split(",");
      elasticsiemArr.forEach((element: any) => {
        elasticsiemArray.push(element);
      });
    } else {
      elasticsiemArray = [];
    }

    let zeekStr = script.zeek;
    if (zeekStr) {
      let zeekArr = zeekStr.split(",");

      zeekArr.forEach((element: any) => {
        zeekArray.push(element);
      });
    } else {
      zeekArray = [];
    }

    let updatesigma = false;
    inputArray = inputArrayVar;
    inputArray.forEach(element => {
      delete element.id;
      if (element.rule.length > 0 || typeof (element.elastalert) == "object") {
        inputArgsArray.push(element);
        updatesigma = true
      }
    });

    let osTypeSelectionObj = {};
    let xToolNames: any = {};
    let osTypeSelectionArray: any[] = [];

    if (!isTechIdDisabled) {

      osTypeSelectionObj = {
        "osquery": osQueryArray,
        "elasticsiem": elasticsiemArray,
        "zeek": zeekArray,
        "other": otherArray,
        "sigma": inputArgsArray,
      };
      inputArgsArray = [];
      osTypeSelectionArray.push(osTypeSelectionObj);
      xToolNames = { [script.osType.toString().trim().toLowerCase()]: osTypeSelectionArray };
      extensionsObject = { "x-os-names": xToolNames };
    }
    else {
      let scriptData = content.controls["jsondata"].value;
      let parsedJson = JSON.parse(scriptData);
      let osTypeObj = parsedJson.extensions["x-acds-detection-ext"]["x-os-names"];
      let osSelector = content.controls["osType"].value.toString().trim().toLowerCase();
      if (Object.keys(osTypeObj).includes(osSelector)) {
        osTypeSelectionObj = {
          "osquery": osQueryArray,
          "elasticsiem": elasticsiemArray,
          "zeek": zeekArray,
          "other": otherArray,
          "sigma": inputArgsArray,
        };
        if ((typeof (osTypeObj[osSelector]) == "object") && (JSON.stringify(osTypeObj[osSelector]).startsWith("{"))) {
          osTypeObj[osSelector] = [osTypeObj[osSelector]]
        }

        if (updatesigma) {
          inputArray.forEach(element => {
            if (element.rule.length > 0 || JSON.stringify(element.elastalert).length > 0) {
              osTypeObj[osSelector][0]["sigma"].push(element);
              updatesigma = false
            }
            else {
              console.log("No Sigma data")
            }
          });
          extensionsObject = { "x-os-names": osTypeObj };
        }
        else if (osqueryStr) {
          osQueryArray.forEach(element => {
            if (element.length > 0) {
              osTypeObj[osSelector][0]["osquery"].push(element);
              osqueryStr = null
            }
            else {
              console.log("No OsQuery")
            }
          });
          extensionsObject = { "x-os-names": osTypeObj };
        }
        else if (zeekStr) {
          zeekArray.forEach(element => {
            if (element.length > 0) {
              osTypeObj[osSelector][0]["zeek"].push(element);
              osqueryStr = null
            }
            else {
              console.log("No zeekStr")
            }
          });
          extensionsObject = { "x-os-names": osTypeObj };
        }
        else if (elasticsiemStr) {
          elasticsiemArray.forEach(element => {
            if (element.length > 0) {
              osTypeObj[osSelector][0]["elasticsiem"].push(element);
              elasticsiemStr = null
            }
            else {
              console.log("No elasticsiemStr")
            }
          });
          extensionsObject = { "x-os-names": osTypeObj };
        }
        else if (otherStr) {
          otherArray.forEach(element => {
            if (element.length > 0) {
              osTypeObj[osSelector][0]["other"].push(element);
              otherStr = null
            }
            else {
              console.log("No otherStr")
            }
          });
          extensionsObject = { "x-os-names": osTypeObj };
        }
        else {
          osTypeObj[osSelector].push(osTypeSelectionObj);
          osTypeSelectionArray.push(osTypeSelectionObj);
          extensionsObject = { "x-os-names": osTypeObj };
        }
      }
      else {
        let xNewToolNames: any = {};
        let newArr: any[] = [];
        osTypeSelectionObj = {
          "osquery": osQueryArray,
          "elasticsiem": elasticsiemArray,
          "zeek": zeekArray,
          "other": otherArray,
          "sigma": inputArgsArray,
        };
        newArr.push(osTypeSelectionObj);
        xNewToolNames = { [script.osType.toString().trim().toLowerCase()]: newArr };
        xToolNames = Object.assign(osTypeObj, xNewToolNames);
        extensionsObject = { "x-os-names": xToolNames };
        xNewToolNames = {};
      }
    }
    let xAcdsAttackExt = { "x-acds-detection-ext": extensionsObject };
    let extensions = { "extensions": xAcdsAttackExt };
    content.controls["jsondata"].setValue(this.jsonpipe.transform(extensions));
    return extensions;
  }


  async addDetection(script: any) {
    delete script["detection_id"]
    try {
      let vardata = await this.service.addDetection(script).toPromise();
      alert("Script added successfully!"); 
    }
    catch (err) {
      console.log("Server Error: " + err);
      if (err.status === 500) {
        console.log(err.message);
        alert("500 Internal Server Error");
      }
      else {
        alert("Server Error: " + err);
      }
    }
    this.modalService.dismissAll();
  }


  async updateDetection(item: any) {

    try {
      let vardata = await this.service.updateDetection(item).toPromise();
      this.modalService.dismissAll();
    }
    catch (err) {
      console.log("Server Error: " + err);
      if (err.status === 500) {
        console.log(err.message);
        alert("500 Internal Server Error");
      }
      else {
        alert("Server Error: " + err);
      }
    }
    this.modalService.dismissAll();
  }
}
