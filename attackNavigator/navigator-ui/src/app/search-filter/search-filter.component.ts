import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {

      if (!(filter.includes("{"))) {
        if (data.script && data.dataSource && data.subTechniqueId
          && data.comment && data.scriptType && data.mitreVersion) {
          if (data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.dataSource.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.scriptType.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.comment.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
            ) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.comment && data.dataSource && data.mitreVersion) {
          if (data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.dataSource.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.comment.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.scriptType && data.dataSource && data.mitreVersion) {
          if (data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.dataSource.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.scriptType.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.scriptType && data.comment && data.mitreVersion) {
          if (data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.comment.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.scriptType.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.scriptType && data.mitreVersion) {
          if (data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.scriptType.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.dataSource && data.mitreVersion) {
          if (data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.dataSource.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId
          && data.comment && data.mitreVersion) {
          if (data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.comment.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.script && data.subTechniqueId && data.mitreVersion) {
          if (data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.subTechniqueId && data.script && data.dataSource && data.mitreVersion) {
          if (data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.dataSource.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.subTechniqueId && data.script && data.scriptType && data.mitreVersion) {
          if (data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.scriptType.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        if (data.subTechniqueId && data.script && data.comment && data.mitreVersion) {
          if (data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.mitreVersion.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            data.comment.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        else {
          if (data.subTechniqueId.toString().toLocaleLowerCase().includes(filter.toLocaleLowerCase())) {
            return true
          }
        }
        return false
      }

      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== "") {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        let isTechIdFilter = false;
        let isOSTypeFilter = false;
        let isDataSourceFilter = false;
        let isSupportFilter = false;
        let isDetectionToolFilter = false;
        let isAccuracyScoreFilter = false;
        let isMitreVersionFilter = false;
        let list = Object.keys(searchTerms);

        if (list.indexOf("scriptOSCol") === -1) {
          isOSTypeFilter = true
        }
        if (list.indexOf("mitreVersion") === -1) {
          isMitreVersionFilter = true
        }
        if (list.indexOf("scriptDToolCol") === -1) {
          isDetectionToolFilter = true
        }
        if (list.indexOf("subTechniqueId") === -1) {
          isTechIdFilter = true
        }
        if (list.indexOf("support") === -1) {
          isSupportFilter = true
        }
        if (list.indexOf("dataSource") === -1) {
          isDataSourceFilter = true
        }
        if (list.indexOf("accuracyScore") === -1) {
          isAccuracyScoreFilter = true
        }

        if (isFilterSet) {
          for (const col in searchTerms) {
            if (col === "scriptOSCol") {
              if (data["script"]) {
                let jsondata = JSON.parse(data["script"])
                let osTypeKeys: any[] = Object.keys(jsondata.extensions["x-acds-detection-ext"]["x-os-names"])
                for (let index = 0; index < osTypeKeys.length; index++) {
                  for (let os of searchTerms[col].split(",")) {
                    if (osTypeKeys[index] === os) {
                      isOSTypeFilter = true
                    }
                  }
                }
              }
            }

            if (col === "scriptDToolCol") {
              if (data["script"]) {
                let jsondata = JSON.parse(data["script"])
                let osTypeKeys: any = jsondata.extensions["x-acds-detection-ext"]["x-os-names"]

                for (const [osName, osValue] of Object.entries(osTypeKeys)) {
                  if (Array.isArray(osValue)) {
                    for (let index in osValue) {
                      for (const [toolName, toolValue] of Object.entries(osValue[index])) {
                        for (let tool of searchTerms[col].split(",")) {
                          if (toolName.toString().toLowerCase() === tool.toString().toLowerCase()) {
                            if (osTypeKeys[osName][index][toolName].length > 0) {
                              if (toolName === "sigma") {
                                for (let sigma_index in osTypeKeys[osName][index][toolName]) {
                                  if (osTypeKeys[osName][index][toolName][sigma_index]["rule"]) {
                                    if ((osTypeKeys[osName][index][toolName][sigma_index]["rule"].length > 0)
                                      || typeof (osTypeKeys[osName][index][toolName][sigma_index]["elastalert"]) == "object") {
                                      isDetectionToolFilter = true
                                    }
                                  }
                                }
                              }
                              else {
                                isDetectionToolFilter = true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    for (const [toolName, toolValue] of Object.entries(osTypeKeys[osName])) {
                      for (let tool of searchTerms[col].split(",")) {
                        if (toolName.toString().toLowerCase() === tool.toString().toLowerCase()) {
                          if (osTypeKeys[osName][toolName].length > 0) {
                            if (toolName === "sigma") {
                              for (let sigmaIndex in osTypeKeys[osName][toolName]) {
                                if ((osTypeKeys[osName][toolName][sigmaIndex]["rule"].length > 0)
                                  || typeof (osTypeKeys[osName][toolName][sigmaIndex]["elastalert"]) == "object") {
                                  isDetectionToolFilter = true
                                }
                              }
                            }
                            else {
                              isDetectionToolFilter = true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (col === "subTechniqueId") {
              if (data[col]) {
                for (let techId of searchTerms[col].split(",")) {
                  if (data[col].toString().toLowerCase() === techId.trim().toLowerCase() && isFilterSet) {
                    isTechIdFilter = true
                  }
                }
              }
            }
            if (col === "dataSource") {
              if (data[col]) {
                for (let dataSourcs of searchTerms[col].split(",")) {
                  if (data[col].trim().toLowerCase().includes(dataSourcs.trim().toLowerCase()) && isFilterSet) {
                    isDataSourceFilter = true
                  }
                }
              }
            }
            if (col === "support") {
              if (data[col]) {
                for (let supportElement of searchTerms[col].split(",")) {
                  if (data[col].toString().toLowerCase() === supportElement.trim().toLowerCase()
                    && isFilterSet) {
                    isSupportFilter = true
                  }
                }

              }
            }
            if (col === "accuracyScore") {
              if (data[col]) {
                for (let accuracyElement of searchTerms[col].split(",")) {
                  if (data[col].toString().toLowerCase() === accuracyElement.toLowerCase().trim().toLowerCase()
                    && isFilterSet) {
                    isAccuracyScoreFilter = true
                  }
                }
              }
            }
            if (col === "mitreVersion") {
              if (data[col]) {
                for (let version of searchTerms[col].split(",")) {
                  if (data[col].toString().toLowerCase() === version.toLowerCase().trim().toLowerCase()
                    && isFilterSet) {
                    isMitreVersionFilter = true
                  }
                }
              }
            }
            if (isOSTypeFilter && isDataSourceFilter && isTechIdFilter && isSupportFilter && isAccuracyScoreFilter && isDetectionToolFilter && isMitreVersionFilter) {
              found = true
            }
            else {
              found = false
            }
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }

  getFilterObject(fullObj: any, key: any, filter_name: any) {
    try {
      const uniqChk: any = [];
      fullObj.filter((obj: any) => {
        if (key === "scriptOSCol" && filter_name === "OS Type") {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"])
            let osType_keys: any[] = Object.keys(scriptdata.extensions["x-acds-detection-ext"]["x-os-names"])
            for (let index = 0; index < osType_keys.length; index++) {
              let k = osType_keys[index];
              if ((!uniqChk.includes(k) && (k) && (k.length > 0))) {
                uniqChk.push(k.toLowerCase());
              }
            }
          }
          else {
            console.log("Not a valid JSON")
          }
        }
        else if (key === "scriptDToolCol" && filter_name === "Detection Tool") {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"])
            let detectionTool: any = scriptdata.extensions["x-acds-detection-ext"]["x-os-names"]
            for (const [key, value] of Object.entries(detectionTool)) {
              let osType = detectionTool[key]
              if (Array.isArray(osType)) {
                for (let osTypeIndex in osType) {
                  for (const [key, value] of Object.entries(osType[osTypeIndex])) {
                    if ((!uniqChk.includes(key) && (key) && (key.length > 0))) {
                      uniqChk.push(key.toLowerCase());
                    }
                  }
                }
              }
              else {
                for (const [key, value] of Object.entries(osType)) {
                  if ((!uniqChk.includes(key) && (key) && (key.length > 0))) {
                    uniqChk.push(key.toLowerCase());
                  }
                }
              }
            }
          }
          else {
            console.log("Not a valid JSON")
          }
        }
        else if ((!uniqChk.includes(obj[key]) && (obj[key]) && (obj[key].toString().length > 0))) {
          uniqChk.push(obj[key]);
        }
        return obj;
      });
      return uniqChk;
    } catch (error) {
      console.log(error);
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

}
