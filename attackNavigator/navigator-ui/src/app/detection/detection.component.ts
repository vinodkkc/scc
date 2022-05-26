import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { GlobalConstantsComponent } from '../global-constants/global-constants/global-constants.component';
import { AppConstantsComponent } from "../app-constants/app-constants.component";
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from '../conformation-dialog/conformation-dialog.component';
import { DataCrudComponent } from '../data-crud/data-crud.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

// __author__ = "Akash Gaurav" 


@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css'],
  providers: [DataCrudComponent, SearchFilterComponent]
})
export class DetectionComponent implements OnInit {

  filterSelectObj: any = []; 
  filterValues: any = {}; 
  modalHeader: any; 
  comment: any; 
  accuracyScore: number;
  DetectionList: any = []; 
  techIdsExcludedInDetection: any = []; 
  selectedDataSource: any = [];
  selectedOSType: any = []; 
  dropdownSelectedDataSrc: any = []; 
  dropdownSelectedOSType: any = [];
  selectedItems: any = []; 
  unselectedItems: any = []; 
  showJson: boolean; 
  showJsonData: boolean;
  isTechIdDisabled: boolean; 
  exportJsonMitreVersion: any[] = []; 
  editJsonString: any = null;
  selectedDetectionTool: any; 
  detectionId: any; 
  isFirstSearchTextInput = true; 
  searchTextInput: any;
  modalContent: any; 
  isFilterOption: any = false;

  constTechniqueId:string = AppConstantsComponent.TECHNIQUE_ID;
  constMitreVersion:string = AppConstantsComponent.MITRE_VERSION;
  constOSType:string = AppConstantsComponent.OS_TYPE;
  constDetectionTool:string = AppConstantsComponent.DETECTION_TOOL;
  constDataSource:string = AppConstantsComponent.DATA_SOURCE;
  constSupport:string = AppConstantsComponent.SUPPORT;
  constAccuracy:string = AppConstantsComponent.ACCURACY;
  constAccuracyScore:string = AppConstantsComponent.ACCURACY_SCORE;
  constScript:string = AppConstantsComponent.SCRIPT;
  constExportJson:string = AppConstantsComponent.EXPORT_JSON;
  constAdd:string = AppConstantsComponent.ADD;
  constEdit:string = AppConstantsComponent.EDIT;
  constReset:string = AppConstantsComponent.RESET;
  constActions:string = AppConstantsComponent.ACTIONS;
  constSearchHere:string = AppConstantsComponent.SEARCH_HERE;
  constSearch:string = AppConstantsComponent.SEARCH;
  constOSQuery:string = AppConstantsComponent.OSQUERY;
  constZeek:string = AppConstantsComponent.ZEEK;
  constElasticsiem:string = AppConstantsComponent.ELASTICSIEM;
  constOther:string = AppConstantsComponent.OTHER;
  constAddMore:string = AppConstantsComponent.ADD_MORE;
  constSubmit:string = AppConstantsComponent.SUBMIT;
  constComment:string = AppConstantsComponent.COMMENT;
  constDetections:string = AppConstantsComponent.DETECTION;
  constDetectionId:string = AppConstantsComponent.DETECTION_ID;
  constTotalDetections:string = AppConstantsComponent.TOTAL_DETECTION;
  filterTitle: string = AppConstantsComponent.FILTER_TITLE;
  subFilterTitle: string = AppConstantsComponent.SUB_FILTER_TITLE;
  constExportCSV:string = AppConstantsComponent.EXPORT_CSV;
  constCopytoClipboard:string = AppConstantsComponent.COPY_TO_CLIPBOARD;
  constStixView:string = AppConstantsComponent.STIX_VIEW;
  jsonValue: string;
  textValue: any;
  techId: any;
  
  constructor(private service: CrudoperationService, private modalService: NgbModal,
    private changeDetection: ChangeDetectorRef, private jsonpipe: JsonPipe,
    public datepipe: DatePipe, private formBuilder: FormBuilder, public dialog: MatDialog,
    public dataCrud: DataCrudComponent, public searchFilter: SearchFilterComponent
    ) {

    this.filterSelectObj = [
      {
        name: AppConstantsComponent.TECHNIQUE_IDS,
        columnProp: "subTechniqueId",
        options: []
      },
      {
        name: AppConstantsComponent.MITRE_VERSION,
        columnProp: "mitreVersion",
        options: []
      },
      {
        name: AppConstantsComponent.OS_TYPE,
        columnProp: "scriptOSCol",
        options: []
      },
      {
        name: AppConstantsComponent.DETECTION_TOOL,
        columnProp: "scriptDToolCol",
        options: []
      },
      {
        name: AppConstantsComponent.DATA_SOURCE,
        columnProp: "dataSource",
        options: []
      },
      {
        name: AppConstantsComponent.SUPPORT,
        columnProp: "support",
        options: []
      }, {
        name: AppConstantsComponent.ACCURACY,
        columnProp: "accuracyScore",
        options: []
      }
    ]
  }

  detectionToolValueAndText: DetectionToolValueAndText[] = [
    new DetectionToolValueAndText("osquery", "OSQuery"),
    new DetectionToolValueAndText("sigma", "Sigma"),
    new DetectionToolValueAndText("elasticsiem", "Elastic siem"),
    new DetectionToolValueAndText("zeek", "Zeek"),
    new DetectionToolValueAndText("other", "Other")];

  dataSource = new MatTableDataSource();
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsOS: IDropdownSettings = {};
  dropdownSettingsDS: IDropdownSettings = {};
  dropdownSettingsFilter: IDropdownSettings = {};
  dropdownSettingsforType: IDropdownSettings = {};
  displayedColumns: string[] = ["subTechniqueId", "mitreVersion", "script", "dataSource", "comment", "accuracyScore", "support", "actions"];
  filterColumns: string[] = ["subTechniqueId", "mitreVersion", "script", "dataSource", "comment", "accuracyScore", "support"];
  numbers = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.changeDetection.detectChanges();
  }

  addForm = new FormGroup({
    script: new FormControl(),
    scriptType: new FormControl(),
    support: new FormControl(),
    comment: new FormControl(),
    color: new FormControl(),
    dataSource: new FormControl(),
    accuracyScore: new FormControl(),
    techniqueIds: new FormControl("", [Validators.required]),
    osType: new FormControl("", [Validators.required]),
    detectionTool: new FormControl("", [Validators.required]),
    jsondata: new FormControl(),
    elasticsiem: new FormControl(),
    zeek: new FormControl(),
    osquery: new FormControl(),
    sigma: new FormControl(),
    other: new FormControl(),
    mitreVersion: new FormControl(),
  });

  public inputArgArray: any[] = [{
    id: 1,
    rule: "",
    elastalert: "",
  }];

  async ngOnInit() {
    this.modalHeader === this.constAdd;
    this.showJson = false;
    this.showJsonData = true;
    this.isTechIdDisabled = false;

    await this.refreshDetectionList();
    await this.getTechId();
    await this.getVersionAndDataSrc();
    this.selectedDataSource = [];
    this.dataSource.filterPredicate = await this.searchFilter.createFilter();
    this.resetFilters();

    this.dropdownSettingsforType = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: false
    }

    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: true
    };

    this.dropdownSettingsOS = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: false
    };

    this.dropdownSettingsDS = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: false
    };

    this.dropdownSettingsFilter = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 2,
      enableCheckAll: false,
      allowSearchFilter: true
    };
  }

  async refreshDetectionList() {
    try {
      let data: any[] = await this.service.getDetectionList().toPromise();
      data.sort((a: any, b: any) => (a.modyifyDate < b.modyifyDate) ? 1 : -1)
      this.DetectionList = [];
      this.DetectionList = data;
      let attr: any;

      for (const item of Object.keys(this.DetectionList)) {
        if (this.DetectionList[item].attributes) {
          if (typeof (this.DetectionList[item].attributes) == "object") {
            attr = this.DetectionList[item].attributes
          }
          else {
            attr = JSON.parse(this.DetectionList[item].attributes.replace(/'/g, '"'))
          }
          this.DetectionList[item]["accuracyScore"] = attr["accuracy_score"]
        }
      }

      this.dataSource.data = this.DetectionList
      this.filterSelectObj.filter((objc: any) => {
        if (objc.columnProp != "dataSource") {
          objc.options = this.searchFilter.getFilterObject(this.DetectionList, objc.columnProp, objc.name);
        }
      });
      let count = 0
      for (let item of this.displayedColumns) {
        this.hideColumnSort[item] = count;
        count += 1;
      }
    } catch (err) {
      console.log(err);
    }
  }

  applyPipeFilter(filterValue: any) {
    if (filterValue.target.value) {
      if (this.isFilterOption && this.isFirstSearchTextInput) {
        this.dataSource.data = this.dataSource.filteredData;
        this.isFirstSearchTextInput = false;
      }
      filterValue = filterValue.target.value
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    else {
      this.dataSource.filter = "";
      this.isFirstSearchTextInput = true;
    }
  }

  multiFilterDeSelect(filter: any, event: any) {
    let isModelValueUndefined = false;
    let filterList = this.filterValues[filter.columnProp].split(",");

    for (let index = 0; index < filterList.length; index++) {
      if (filterList[index] === event.toString().trim().toLowerCase()) {
        filterList.splice(index, 1);
      }
    }

    this.filterValues[filter.columnProp] = filterList.join()
    this.dataSource.filter = JSON.stringify(this.filterValues)

    for (let index = 0; index < this.filterSelectObj.length; index++) {
      if (this.filterSelectObj[index].modelValue === undefined || this.filterSelectObj[index].modelValue.length === 0) {
        isModelValueUndefined = true;
      } else {
        isModelValueUndefined = false;
        break;
      }
    }
    if (isModelValueUndefined) {
      this.isFilterOption = false;
      this.searchTextInput = "";
      this.dataSource.data = this.DetectionList;
    }
  }

  multiFilterChange(filter: any, event: any) {
    this.searchTextInput = "";
    this.isFirstSearchTextInput = true;
    this.isFilterOption = true;
    if (event) {
      if (this.filterValues[filter.columnProp]) {
        this.filterValues[filter.columnProp] = this.filterValues[filter.columnProp] + "," + event.toString().trim().toLowerCase();
      }
      else {
        this.filterValues[filter.columnProp] = event.toString().trim().toLowerCase()
      }
      this.dataSource.filter = JSON.stringify(this.filterValues)
    }
  }

  resetFilters() {
    this.isFilterOption = false;
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
      this.filterValues[value.columnProp] = ""
      this.dataSource.filter = ""
    })
    this.searchTextInput = "";
    this.dataSource.filter = "";
    this.dataSource.data = this.DetectionList;
  }

  async getVersionAndDataSrc() {
    this.service.getUniqueDataSource().subscribe((data: any) => {
      for (const key in this.filterSelectObj) {
        if (this.filterSelectObj[key].columnProp === "dataSource") {
          this.filterSelectObj[key].options = data.unique_ds_list;
        }

        if (this.filterSelectObj[key].columnProp === "mitreVersion") {

          this.exportJsonMitreVersion = this.filterSelectObj[key].options;
          this.exportJsonMitreVersion.push("All")
        }
      }
    });
  }

  async getTechId() {
    try {
      let data = await this.service.getUniqueDecTechIds().toPromise()
      this.techIdsExcludedInDetection = [];
      this.techIdsExcludedInDetection = data;
    } catch (error) {
      console.log(error)
    }
  }

  hideColumnSort: any = {};
  duplicatelist: any = this.displayedColumns.slice()

  filterColumn(event: any, head: any) {
    const colIndex = this.displayedColumns.findIndex(col => col === head);
    if (colIndex >= 0 && event.target.checked === false) {
      this.displayedColumns.splice(colIndex, 1);
      this.duplicatelist[colIndex] = "";
    } else {
      let count = 0
      for (const col of this.displayedColumns) {
        if (this.hideColumnSort[head] < this.hideColumnSort[col]) {
          this.displayedColumns.splice(count, 0, head);
          break
        }
        if ((this.hideColumnSort[head] > this.hideColumnSort[col]) && (count >= this.displayedColumns.length)) {
          this.displayedColumns.splice(this.hideColumnSort[head], 0, head);
          break
        }
        count += 1
      }
    }
  }

  parseSourceFile(file: any, i: any) {
    let doc: any;
    const yaml = require("js-yaml");
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      this.inputArgArray[i].elastalert = yaml.load(event.target?.result);
    });
    console.log(reader.readAsText(file));
    console.log(doc);
  }

  fileChanged(e: any, i: any) {
    let fileUploaded = e.target.files[0];
    this.parseSourceFile(fileUploaded, i)
  }

  onItemSelect(item: any) {
    this.dropdownSelectedDataSrc = "";
    this.dropdownSelectedOSType = "";

    this.service.getTechniqueSingleItem(item).subscribe(vardata => {
      let sJson: any = JSON.parse(JSON.stringify(vardata));
      let ds = sJson.data_source;
      let os = sJson.os_type;
      this.selectedDataSource = "";
      this.selectedOSType = "";
      let regExp = /[^a-zA-Z, ]/g;
      if (ds) {
        ds = ds.replace(regExp, '');
        ds = ds.split(",");
        this.selectedDataSource = ds;
      }
      if (os) {
        os = os.replace(regExp, '');
        os = os.split(",");
        this.selectedOSType = os;
      }
    });

    const index = this.unselectedItems.indexOf(item);

    if (index > -1) {
      this.unselectedItems.splice(index, 1);
    }
  }
  onSelectAll(items: any) {
  }
  onItemDeSelect(items: any) {
    this.unselectedItems.push(items);
  }

  onItemSelectDS(item: any) {
  }
  onSelectAllDS(items: any) {
  }
  onItemDeSelectDS(items: any) {
  }
  onItemSelectOS(item: any) {
  }
  onItemDeSelectOS(item: any) {
  }
  onItemSelectTool(item: any) {
    this.selectedDetectionTool = item.target.value;
  }
  onVersionSelect(ver: any) {
  }

  exportJson(version: any) {
    this.service.exportJson(version).subscribe(vardata => {
      this.openNavigationLayer(vardata)
    });
  }

  openNavigationLayer(url: any) {
    let navigationUrl = GlobalConstantsComponent.navigationUrl + url;
    window.open(navigationUrl, "_blank");
  }

  deleteClick(item: any) {
    this.openDialog(item)
  }

  confirmDelete(item: any, check: any) {
    if (check) {
      this.service.deleteDetection(item).subscribe(async vardata => {
        this.ngOnInit();
      });
    }
  }

  public replace(content: string) {
    return content.replace(",", ", ");
  }

  open(content: any) {
    this.modalHeader = this.constAdd;
    this.getTechId();
    this.unselectedItems = [];
    this.isTechIdDisabled = false;
    this.clearInputMethod();
    this.selectedItems = [];
    this.selectedDataSource = [];
    this.selectedDetectionTool = null;
    this.dropdownSelectedDataSrc = [];
    this.addForm.controls["jsondata"].reset();
    this.editJsonString = "";
    this.comment = ""
    this.accuracyScore = 0;
    let closeResult = ""
    this.modalService.open(content,
      {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        size: "lg",
        keyboard: false
      }).result.then((result) => {
        closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.selectedItems = [];
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  viewJson(jsonView: any, tableRow: any){
    this.jsonValue = this.jsonpipe.transform(JSON.parse(tableRow.script));
    this.textValue = JSON.parse(tableRow.script);
    this.techId = tableRow.subTechniqueId;
    let closeResult = "";
    this.modalService.open(jsonView,
      {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        size: 'lg',
        keyboard: false
      }).result.then(async (result) => {
        closeResult = `Closed with: ${result}`;

      }, (reason) => {
        this.selectedItems = [];
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  async update(content: any, tableRow: any) {
    this.modalHeader = this.constEdit;
    this.getTechId();
    this.unselectedItems = [];
    this.isTechIdDisabled = true;
    let checkbx = false;
    if (tableRow.support === "yes") {
      checkbx = true;
    }
    let parsedScript = JSON.parse(tableRow.script)
    this.addForm.controls["jsondata"].setValue(this.jsonpipe.transform(parsedScript));
    this.jsonValue = this.jsonpipe.transform(parsedScript);
    this.modalContent = {
      detectionId: tableRow.detectionId,
      scriptType: tableRow.scriptType,
      dataSource: tableRow.dataSource,
      comment: tableRow.comment,
      color: tableRow.color,
      support: checkbx,
      accuracyScore: tableRow.accuracyScore,
      techniqueIds: tableRow.subTechniqueId
    };
    this.comment = tableRow.comment;
    this.accuracyScore = tableRow.accuracyScore;
    this.selectedItems = [];
    this.dropdownSelectedDataSrc = [];
    this.selectedDataSource = [];
    this.selectedDetectionTool = null;

    if (tableRow.subTechniqueId != "") {
      let subTech: string = tableRow.subTechniqueId + "";
      this.selectedItems = subTech.split(",");
    }

    for (let val of this.selectedItems) {
      this.onItemSelect(val);
    }
    if (tableRow.dataSource != "" && tableRow.dataSource != null) {
      let dataSrc: string = tableRow.dataSource + "";
      this.dropdownSelectedDataSrc = dataSrc.split(",");
      this.selectedDataSource = this.dropdownSelectedDataSrc;
    }
    this.detectionId = tableRow.detectionId;
    let closeResult = "";
    this.modalService.open(content,
      {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        size: "lg",
        keyboard: false
      }).result.then(async (result) => {
        closeResult = `Closed with: ${result}`;

      }, (reason) => {
        this.selectedItems = [];
        closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  addInputArg() {
    this.inputArgArray.push({
      id: this.inputArgArray.length + 1,
      rule: "",
      elastalert: "",
    });
  }

  removeInputArg(i: number) {
    this.inputArgArray.splice(i, 1);
  }

  logValue() {
    console.log(this.inputArgArray);
  }

  editJsonData() {
    this.showJsonData = false;
    this.editJsonString = this.addForm.controls["jsondata"].value;
  }

  resetJsonData() {
    if (this.editJsonString){
      this.showJsonData = true;
      this.addForm.controls["jsondata"].setValue(this.editJsonString);
    }  
  }

  addMore(content: any) {
    this.showJson = false;
    let checkbx = "no";
    let accuracy = 0;
    let attr = null;
    let userinput = null;
    let color = null;
    userinput = Number(this.addForm.controls["accuracyScore"].value);
    if (userinput) {
      accuracy = userinput
    }
    attr = ' {"accuracyScore": ' + accuracy + '} ';

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

    this.accuracyScore = userinput;
    this.comment = this.addForm.controls["comment"].value;

    let addDetectionJson = {
      script: this.addForm.controls["jsondata"].value,
      osType: this.addForm.controls["osType"].value,
      comment: this.addForm.controls["comment"].value,
      detectionTool: this.addForm.controls["detectionTool"].value,
      elasticsiem: this.addForm.controls["elasticsiem"].value,
      zeek: this.addForm.controls["zeek"].value,
      osquery: this.addForm.controls["osquery"].value,
      other: this.addForm.controls["other"].value,
      dataSource: this.addForm.controls["dataSource"].value,
      attributes: attr,
      support: checkbx,
      color: color,
      sigma: "",
      techniqueIds: this.selectedItems,
    }

    let action = this.modalHeader;
    let inputArray = this.inputArgArray;
    let isTechIdDisabled = this.isTechIdDisabled;
    let extensions = this.dataCrud.createJSON(addDetectionJson, content, action, inputArray, isTechIdDisabled);
    this.addForm.controls["jsondata"].setValue(this.jsonpipe.transform(extensions));
    this.isTechIdDisabled = true;
    this.clearInputMethod();
  }

  clearInputMethod() {
    this.addForm.controls["sigma"].reset();
    this.addForm.controls["detectionTool"].reset();
    this.addForm.controls["osType"].reset();
    this.addForm.controls["osquery"].reset();
    this.addForm.controls["elasticsiem"].reset();
    this.addForm.controls["zeek"].reset();
    this.addForm.controls["other"].reset();
    this.selectedDetectionTool = null;
    this.inputArgArray = [{
      id: 1,
      rule: "",
      elastalert: "",
    }];
  }

  async submit(content: any) {
    let techIdInfo =  this.selectedItems;
    let action = this.modalHeader;
    let pKey = this.detectionId; 
    let inputArray = this.inputArgArray;
    let isTechIdDisabled = this.isTechIdDisabled;
    await this.dataCrud.onFormSubmit(content, action, techIdInfo, pKey, inputArray, isTechIdDisabled);
    this.modalService.dismissAll();
    this.dataSource.filterPredicate = await this.searchFilter.createFilter();
    this.ngOnInit();
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ConformationDialogComponent,
      {
        restoreFocus: false,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDelete(item, result)
      }
    });
  }
}

class DetectionToolValueAndText {
  constructor(public Value: string, public Text: string) { }
}