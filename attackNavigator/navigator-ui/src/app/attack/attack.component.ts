import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { CrudoperationService } from "src/app/services/crudoperation.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { DatePipe, JsonPipe } from "@angular/common";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { AppConstantsComponent } from "../app-constants/app-constants.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConformationDialogComponent } from "../conformation-dialog/conformation-dialog.component";

@Component({
  selector: "app-attack",
  templateUrl: "./attack.component.html",
  styleUrls: ["./attack.component.css"],
})
export class AttackComponent implements OnInit {
  filterSelectObj: any = [];
  filterValues: any = {};
  textValue: any;
  jsonValue: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: CrudoperationService,
    private modalService: NgbModal,
    private jsonpipe: JsonPipe,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private changeDetection: ChangeDetectorRef
  ) {
    this.filterSelectObj = [
      {
        name: AppConstantsComponent.TECHNIQUE_IDS,
        columnProp: "sub_technique_id",
        options: [],
      },
      {
        name: AppConstantsComponent.MITRE_VERSION,
        columnProp: "mitre_version",
        options: [],
      },
      {
        name: AppConstantsComponent.TOOLS,
        columnProp: "tools",
        options: [],
      },
      {
        name: AppConstantsComponent.EXECUTOR,
        columnProp: "executor",
        options: [],
      },

      {
        name: AppConstantsComponent.EXECUTION_STATUS,
        columnProp: "executionstatus",
        options: [],
      },
      {
        name: AppConstantsComponent.PLATFORM,
        columnProp: "platform",
        options: [],
      },
    ];

    //initialise the file upload varaibles
    this.abilityName = "";
    this.platform = "";
    this.cleanupCommand = "";
  }

  AttackList: any = [];
  searchText: string;
  supportFilter: string;
  allTechIds: any = [];
  allPlatforms: any = [];
  selectedItems: any = [];
  executorSelectionData: any = [];
  unselectedItems: any = [];
  allTechIdsdict: any;
  selectedExecutorItems: any = [];
  unselectedExecutorItems: any = [];
  selectedOptions: string;
  showAbility: boolean;
  showFile: boolean = true;
  editJsonString: any;
  dropdownSettings: IDropdownSettings = {};
  executorDropdownSettings: IDropdownSettings = {};
  dropdownSettingsDS: IDropdownSettings = {};
  displayedColumns: string[] = [
    "sub_technique_id",
    "mitre_version",
    "script",
    "comment",
    "support",
    "actions",
  ];

  temp_id: any;
  attack_id: any;
  closeResult = "";
  script = "";
  modalContent: any;
  showAddMore: boolean;
  showJson: boolean;
  showJsonData: boolean;
  isTechIdDisabled: boolean;
  modal_header: any;
  toolSelectionArray: any[] = [];
  toolNamesStr: any;
  consolidatedComment: any;
  x_tool_names: any = {};
  new_x_tool_names: any = {};
  extensionsObject = {};
  dropdownList: any[] = [];
  IsChecked: boolean;
  isSupported: any;
  isFirstSearchTextInput = true;
  searchTextInput: any;
  isFilterOption: any = false;
  /****************file upload***********************/

  fileUploaded: any;
  preRequisite: any;
  platform: any;
  abilityName: any;
  inputArg: any;
  command: any;
  cleanupCommand: any;
  executorName: any = [];
  input_arg_keys: any = [];
  attack_technique: any;
  isFileUploaded: boolean = false;
  disableFileUpload: boolean = true;
  techId: any;

  addattackDetails = {
    script: null,
    pre_requisite: null,
    file_name: null,
    script_type: null,
    comment: null,
    pre_command: null,
    command: null,
    post_command: null,
    cleanup: "NA",
    ability_name: null,
    execution_status: null,
    tool_selection: " ",
    executor_selection: this.selectedExecutorItems,
    platform: null,
    technique_ids: null,
  };
  /******************************************************/

  dataSource = new MatTableDataSource();

  d_id: boolean = true;
  t_id: boolean = true;
  scrpt: boolean = true;
  s_type: boolean = true;
  cmt: boolean = true;
  d_s: boolean = true;
  a_s: boolean = true;
  spt: boolean = true;
  hidenav: boolean = true;
  @ContentChild("inputFile", { static: true }) fileInputVariable: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  dictvar: any = {};
  duplicatelist: any = this.displayedColumns.slice();

  addForm = this.formBuilder.group({
    script: new FormControl(),
    pre_requisite: new FormControl(),
    file_name: new FormControl(),
    script_type: new FormControl(),
    technique_ids: new FormControl(),
    comment: new FormControl(),
    support: new FormControl(),
    tool_selection: new FormControl("", [Validators.required]),
    executor_selection: new FormControl("", [Validators.required]),
    pre_command: new FormControl(),
    command: new FormControl("", [Validators.required]),
    post_command: new FormControl(),
    cleanup: new FormControl("", [Validators.required]),
    ability_name: new FormControl(),
    execution_status: new FormControl(),
    platform: new FormControl(),
    jsondata: new FormControl(),
    mitre_version: new FormControl(),
    fileUpload: new FormControl(),
  });

  public inputArgArray: any[] = [];

  //---------file upload yaml
  public inArgArray: any[] = [
    {
      id: 1,
      key: "",
      value: "",
    },
  ];
  //----------------
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.changeDetection.detectChanges();
  }

  ngOnInit(): void {
    this.consolidatedComment = "";
    this.showAddMore = true;
    this.showJson = false;
    this.showJsonData = true;
    this.isTechIdDisabled = false;
    this.isFileUploaded = false;
    this.temp_id = "";
    this.IsChecked = true;
    this.dropdownList = [
      "psh",
      "pwsh",
      "cmd",
      "sh",
      "shellcode_amd64",
      "shellcode_386",
      "donut_amd64",
      "msfconsole",
      "meterpreter",
    ];
    this.refreshAttackList();
    this.executorDropdownSettings = {
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
    };

    this.dropdownSettingsDS = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      enableCheckAll: false,
      allowSearchFilter: true,
    };
    this.dataSource.filterPredicate = this.createFilter();
  }

  addInputArg() {
    this.inputArgArray.push({
      id: this.inputArgArray.length + 1,
      key: "",
      value: "",
    });
  }

  removeInputArg(i: number) {
    this.inputArgArray.splice(i, 1);
  }

  logValue() {
    console.log(this.inputArgArray);
  }

  refreshAttackList() {
    this.service.getAttackList().subscribe((data) => {
      data.sort((a, b) => (a.modyify_date > b.modyify_date ? 1 : -1));
      this.AttackList = data;

      let count = 0;
      for (var item of this.AttackList) {
        if (item.attributes) {
          let attr = JSON.parse(item.attributes.replace(/'/g, '"'));
          this.AttackList[count]["executor"] = attr["executor"];
        }
        count += 1;
      }

      this.dataSource.data = this.AttackList;
      this.filterSelectObj.filter((objc: any) => {
        objc.options = this.getFilterObject(
          this.AttackList,
          objc.columnProp,
          objc.name
        );
      });
    });
    var count = 0;
    for (let item of this.displayedColumns) {
      this.dictvar[item] = count;
      count += 1;
    }
  }

  resetFilters() {
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
      this.filterValues[value.columnProp] = "";
      this.dataSource.filter = "";
    });
    this.isFilterOption = false;
    this.searchTextInput = "";
    this.dataSource.filter = "";
    this.dataSource.data = this.AttackList;
  }

  //  Called onload
  getFilterObject(fullObj: any, key: any, filter_name: any) {
    try {
      const uniqChk: any = [];

      fullObj.filter((obj: any) => {
        if (key == "tools" && filter_name == AppConstantsComponent.TOOLS) {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"]);

            let tool_selection_keys: any[] = Object.keys(
              scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"]
            );

            for (var i = 0; i < tool_selection_keys.length; i++) {
              var k = tool_selection_keys[i];
              if (k && k.length > 0 && !uniqChk.includes(k)) {
                uniqChk.push(k.toLowerCase());
              }
            }
          }
        } else if (
          key == "executor" &&
          filter_name == AppConstantsComponent.EXECUTOR
        ) {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"]);
            let tool_selection_keys: any[] = Object.keys(
              scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"]
            );
            for (var j = 0; j < tool_selection_keys.length; j++) {
              let tool_selection_array: any[] =
                scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"][
                  tool_selection_keys[j]
                ];

              for (var i = 0; i < tool_selection_array.length; i++) {
                if (Array.isArray(tool_selection_array[i]["executor"])) {
                  let k: any[] = tool_selection_array[i]["executor"];

                  for (var l = 0; l < k.length; l++) {
                    if (
                      k[l] &&
                      k[l].length > 0 &&
                      !uniqChk.includes(k[l].toLowerCase())
                    ) {
                      uniqChk.push(k[l].toLowerCase());
                    }
                  }
                } else {
                  let k: any = tool_selection_array[i]["executor"];

                  if (k && k.length > 0 && !uniqChk.includes(k)) {
                    uniqChk.push(k.toLowerCase());
                  }
                }
              }
            }
          }
        } else if (
          key == "executionstatus" &&
          filter_name == AppConstantsComponent.EXECUTION_STATUS
        ) {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"]);

            let tool_selection_keys: any[] = Object.keys(
              scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"]
            );

            for (var j = 0; j < tool_selection_keys.length; j++) {
              let tool_selection_array: any[] =
                scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"][
                  tool_selection_keys[j]
                ];

              for (var i = 0; i < tool_selection_array.length; i++) {
                let k = tool_selection_array[i]["execution_status"];

                if (k && k.length > 0 && !uniqChk.includes(k.toLowerCase())) {
                  uniqChk.push(k.toLowerCase());
                }
              }
            }
          }
        } else if (
          key == "platform" &&
          filter_name == AppConstantsComponent.PLATFORM
        ) {
          if (this.IsJsonString(obj["script"])) {
            let scriptdata = JSON.parse(obj["script"]);

            let tool_selection_keys: any[] = Object.keys(
              scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"]
            );

            for (var j = 0; j < tool_selection_keys.length; j++) {
              let tool_selection_array: any[] =
                scriptdata.extensions["x-acds-attack-ext"]["x-tool-names"][
                  tool_selection_keys[j]
                ];

              for (var i = 0; i < tool_selection_array.length; i++) {
                let k = tool_selection_array[i]["platforms"];

                if (k && k.length > 0 && !uniqChk.includes(k.toLowerCase())) {
                  uniqChk.push(k.toLowerCase());
                }
              }
            }
          }
        } else if (
          obj[key] &&
          obj[key].toString().length > 0 &&
          !uniqChk.includes(obj[key])
        ) {
          uniqChk.push(obj[key]);
        }
        return obj;
      });
      return uniqChk;
    } catch (error) {
      console.log(error);
    }
  }

  supportText(event: any) {
    this.supportFilter = event.target.checked.toString();
  }

  getTechId() {
    this.service.getUniqueTechniqueIds().subscribe((data) => {
      this.allTechIds = data;
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
  }

  getPlatformDetails(selectedTechId: any) {
    var platformArray: any = [];
    this.service.getPlatformDetails(selectedTechId).subscribe((data) => {
      if (data) {
        let parsedJsonData = JSON.parse(JSON.stringify(data));
        let platformStr = parsedJsonData[0]["platform"].replace(/'/g, "");
        if (platformStr) {
          let platformArr = platformStr.split(",");

          platformArr.forEach((element: any) => {
            platformArray.push(element);
          });
        } else {
          platformArray = [];
        }
        this.allPlatforms = platformArray;
      }
    });
  }

  getSelectedTool(args: any) {
    this.selectedOptions = args.target.value;
    let selectedTool = args.target.options[args.target.selectedIndex].text;
    if (
      this.selectedOptions != "atomicred" &&
      this.selectedOptions != "caldera"
    ) {
      this.disableFileUpload = true;
    } else {
      this.disableFileUpload = false;
    }
  }

  onItemSelect(item: any) {
    const index = this.unselectedItems.indexOf(item);

    // if the element is in the array, remove it
    if (index > -1) {
      // remove item
      this.unselectedItems.splice(index, 1);
    }

    this.getPlatformDetails(this.selectedItems[0]);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemDeSelect(items: any) {
    this.unselectedItems.push(items);
  }

  onExecutorItemSelect(item: any) {
    this.selectedExecutorItems.push(item);
    const index = this.selectedExecutorItems.indexOf(item);

    // if the element is in the array, remove it
    if (index > -1) {
      // remove item
      this.selectedExecutorItems.splice(index, 1);
    }
  }

  onExecutorSelectAll(items: any) {
    console.log(items);
  }

  onExecutorItemDeSelect(items: any) {
    this.unselectedExecutorItems.push(items);
    const index: number = this.selectedExecutorItems.indexOf(items);
    if (index !== -1) {
      this.selectedExecutorItems.splice(index, 1);
    }
  }

  createJSON(script: any) {
    let currentDate = new Date();
    let toolsObject = {};
    let preCommandArray: any[] = [];
    let commandArray: any[] = [];
    let postCommandArray: any[] = [];
    let prerequisiteArray: any[] = [];
    let inputArgsArray: any[] = [];
    let inputArray: any[] = [];
    let executorArray: any[] = [];

    let precmdStr = script.pre_command;
    if (precmdStr) {
      let prcmdArr = precmdStr.split(",");

      prcmdArr.forEach((element: any) => {
        preCommandArray.push(element);
      });
    } else {
      preCommandArray = [];
    }

    let commandStr = script.command;
    if (commandStr) {
      let cmdArr = commandStr.split(",");

      cmdArr.forEach((element: any) => {
        commandArray.push(element);
      });
    } else {
      commandArray = [];
    }

    let postCmdStr = script.post_command;
    if (postCmdStr) {
      let postCmdArr = postCmdStr.split(",");

      postCmdArr.forEach((element: any) => {
        postCommandArray.push(element);
      });
    } else {
      postCommandArray = [];
    }

    let prerequisiteStr = script.pre_requisite;
    if (prerequisiteStr) {
      let prereqArr = prerequisiteStr.split(",");

      prereqArr.forEach((element: any) => {
        prerequisiteArray.push(element);
      });
    } else {
      prerequisiteArray = [];
    }
    inputArray = this.inputArgArray;
    inputArray.forEach((element) => {
      delete element.id;
      inputArgsArray.push(element);
    });

    executorArray = script.executor_selection;
    this.inputArgArray = [];

    var cmnt =
      this.addForm.controls["comment"].value != null
        ? this.addForm.controls["comment"].value
        : "";

    if (script.execution_status) {
      if (script.execution_status != "") {
        if (this.isSupported == "") {
          this.isSupported = "yes";
        } else {
          if (this.isSupported == "no") {
            this.isSupported = "no";
          } else {
            this.isSupported = "yes";
          }
        }
      }
    } else {
      this.isSupported = "no";
    }

    if (!this.isTechIdDisabled) {
      var toolSelectionObj = {};
      toolSelectionObj = {
        executor: executorArray,
        pre_command: preCommandArray,
        command: commandArray,
        post_command: postCommandArray,
        input_arguments: inputArgsArray,
        cleanup: script.cleanup != null ? script.cleanup : "",
        file_name: script.file_name != null ? script.file_name : "",
        "pre-requisite": prerequisiteArray,
        execution_status:
          script.execution_status != null ? script.execution_status : "",
        ability_name: script.ability_name != null ? script.ability_name : "",
        platform: script.platform != null ? script.platform : "",
        created_date: this.datepipe.transform(currentDate, "dd/MM/yyyy"),
        modified_date: "",
      };
      inputArgsArray = [];
      this.toolSelectionArray.push(toolSelectionObj);

      this.x_tool_names = { [script.tool_selection]: this.toolSelectionArray };
      this.extensionsObject = { "x-tool-names": this.x_tool_names };
    } else {
      var toolSelector = "";
      var scriptData = this.addForm.controls["jsondata"].value;
      var parsedJson = JSON.parse(scriptData);
      var toolsObj = parsedJson.extensions["x-acds-attack-ext"]["x-tool-names"];
      if (this.isFileUploaded) {
        toolSelector = script.tool_selection;
      } else {
        toolSelector = this.addForm.controls["tool_selection"].value;
      }

      if (Object.keys(toolsObj).includes(toolSelector)) {
        toolSelectionObj = {
          executor: executorArray,
          pre_command: preCommandArray,
          command: commandArray,
          post_command: postCommandArray,
          input_arguments: inputArgsArray,
          cleanup:
            this.addForm.controls["cleanup"].value != null
              ? this.addForm.controls["cleanup"].value
              : this.cleanupCommand,
          file_name:
            this.addForm.controls["file_name"].value != null
              ? this.addForm.controls["file_name"].value
              : "",
          "pre-requisite": prerequisiteArray,
          execution_status:
            this.addForm.controls["execution_status"].value != null
              ? this.addForm.controls["execution_status"].value
              : "",
          ability_name:
            this.addForm.controls["ability_name"].value != null
              ? this.addForm.controls["ability_name"].value
              : this.abilityName,
          platform:
            this.addForm.controls["platform"].value != null
              ? this.addForm.controls["platform"].value
              : this.platform,
          created_date: this.datepipe.transform(currentDate, "dd/MM/yyyy"),
          modified_date:
            this.modal_header == "Edit"
              ? this.datepipe.transform(currentDate, "dd/MM/yyyy")
              : "",
        };
        toolsObj[toolSelector].push(toolSelectionObj);
        this.toolSelectionArray.push(toolSelectionObj);
        this.extensionsObject = { "x-tool-names": toolsObj };
      } else {
        var newArr: any[] = [];
        toolSelectionObj = {
          executor: executorArray,
          pre_command: preCommandArray,
          command: commandArray,
          post_command: postCommandArray,
          input_arguments: inputArgsArray,
          cleanup:
            this.addForm.controls["cleanup"].value != null
              ? this.addForm.controls["cleanup"].value
              : this.cleanupCommand,
          file_name:
            this.addForm.controls["file_name"].value != null
              ? this.addForm.controls["file_name"].value
              : "",
          "pre-requisite": prerequisiteArray,
          execution_status:
            this.addForm.controls["execution_status"].value != null
              ? this.addForm.controls["execution_status"].value
              : "",
          ability_name:
            this.addForm.controls["ability_name"].value != null
              ? this.addForm.controls["ability_name"].value
              : this.abilityName,
          platform:
            this.addForm.controls["platform"].value != null
              ? this.addForm.controls["platform"].value
              : this.platform,
          created_date: this.datepipe.transform(currentDate, "dd/MM/yyyy"),
          modified_date:
            this.modal_header == "Edit"
              ? this.datepipe.transform(currentDate, "dd/MM/yyyy")
              : "",
        };
        newArr.push(toolSelectionObj);
        this.new_x_tool_names = { [script.tool_selection]: newArr };
        this.x_tool_names = Object.assign(toolsObj, this.new_x_tool_names);
        this.extensionsObject = { "x-tool-names": this.x_tool_names };
        this.new_x_tool_names = {};
      }
    }

    this.x_tool_names = {}; //reset x_tool_names

    var x_acds_attack_ext = { "x-acds-attack-ext": this.extensionsObject };
    var extensions = { extensions: x_acds_attack_ext };
    this.addForm.controls["jsondata"].setValue(
      this.jsonpipe.transform(extensions)
    );
  }

  editJsonData() {
    this.showJsonData = false;
    this.editJsonString = this.addForm.controls["jsondata"].value;
  }
  resetJsonData() {
    this.showJsonData = true;
    this.addForm.controls["jsondata"].setValue(this.editJsonString);
  }
  addMore(content: any) {
    ////////////////////////////////////////////////////
    this.showJson = false;

    var addattack = {
      script: this.addForm.controls["jsondata"].value,
      pre_requisite: this.addForm.controls["pre_requisite"].value,
      file_name: this.addForm.controls["file_name"].value,
      script_type: this.addForm.controls["script_type"].value,
      comment: this.addForm.controls["comment"].value,
      pre_command: this.addForm.controls["pre_command"].value,
      command: this.addForm.controls["command"].value,
      post_command: this.addForm.controls["post_command"].value,
      cleanup: this.addForm.controls["cleanup"].value,
      ability_name: this.addForm.controls["ability_name"].value,
      execution_status: this.addForm.controls["execution_status"].value,
      tool_selection: this.addForm.controls["tool_selection"].value,
      executor_selection: this.selectedExecutorItems,
      platform: this.addForm.controls["platform"].value,
      sub_technique_id: this.selectedItems[0],
    };
    if (this.isFileUploaded) {
      // this.parseSourceFile(this.fileUploaded);
      this.disableFileUpload = true;
      this.isFileUploaded = false;
    } else {
      this.createJSON(addattack);
      this.isTechIdDisabled = true;
    }

    this.clearInputMethod();
    this.clearInputField();
  }

  clearInputMethod() {
    this.addForm.controls["cleanup"].reset();
    this.addForm.controls["file_name"].reset();
    this.addForm.controls["pre_requisite"].reset();
    this.addForm.controls["pre_command"].reset(),
      this.addForm.controls["command"].reset(),
      this.addForm.controls["post_command"].reset(),
      // this.addForm.controls["comment"].reset();
      this.addForm.controls["ability_name"].reset();
    this.addForm.controls["executor_selection"].reset();
    this.addForm.controls["platform"].reset();
    this.addForm.controls["tool_selection"].reset();
    this.addForm.controls["execution_status"].reset();
    this.selectedExecutorItems = [];
    this.addForm.controls["fileUpload"].reset();
  }

  addAttack(script: any) {
    this.service.addAttack(script).subscribe(
      (vardata) => {
        var a = JSON.parse(JSON.stringify(vardata));
        this.temp_id = a.attack_id;
        this.consolidatedComment = "";
        this.isSupported = "";
        this.refreshAttackList();
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err);
        console.log(err.message);
        alert("Error: " + err.message);
      }
    );
  }

  updateAttack(item: any) {
    var attackScript = {
      attack_id: item.attack_id,
      script: item.script,
      pre_requisite: item.pre_requisite,
      script_type: item.script_type,
      file_name: item.file_name,
      sub_technique_id: item.sub_technique_id,
      comment: item.comment,
      support: this.isSupported,
    };
    this.service.updateAttack(attackScript).subscribe(
      (vardata) => {
        var a = JSON.parse(JSON.stringify(vardata));
        this.temp_id = a.attack_id;
        this.isSupported = "";
        this.refreshAttackList();
        this.modalService.dismissAll();
      },
      (err) => {
        console.log("Server Error: " + err);
        if (err.status == 500) {
          console.log(err.message);
          alert("500 Internal Server Error");
        }
      }
    );
  }

  deleteClick(item: any) {
    this.isFileUploaded = false;
    this.openDialog(item);
  }
  submit(content: any) {
    if (this.isFileUploaded == true) {
      // this.parseSourceFile(this.fileUploaded);
      // var cmnt = this.addForm.controls['comment'].value!=null?this.addForm.controls["comment"].value:"";
      // if(this.consolidatedComment==""){
      //  this.consolidatedComment = cmnt;
      // }else{
      // this.consolidatedComment = this.consolidatedComment +"\n"+cmnt ;
      // }
    }

    var addattack = {
      attack_id: "",
      script: this.addForm.controls["jsondata"].value,
      pre_requisite: this.addForm.controls["pre_requisite"].value,
      file_name:
        this.addForm.controls["file_name"].value != null
          ? this.addForm.controls["file_name"].value
          : "",
      // comment: this.consolidatedComment,
      comment:
        this.addForm.controls["comment"].value != null
          ? this.addForm.controls["comment"].value
          : "",
      pre_command: this.addForm.controls["pre_command"].value,
      command: this.addForm.controls["command"].value,
      post_command: this.addForm.controls["post_command"].value,
      cleanup:
        this.addForm.controls["cleanup"].value != null
          ? this.addForm.controls["cleanup"].value
          : "",
      ability_name:
        this.addForm.controls["ability_name"].value != null
          ? this.addForm.controls["ability_name"].value
          : "",
      execution_status: this.addForm.controls["execution_status"].value,
      tool_selection: this.addForm.controls["tool_selection"].value,
      executor_selection: this.selectedExecutorItems,
      platform: this.addForm.controls["platform"].value,
      sub_technique_id: this.selectedItems[0],
      support: this.isSupported,
    };
    // if(this.isFileUploaded){
    //   this.parseSourceFile(this.fileUploaded);
    //  }
    ///////////////add validation conditions
    if (addattack.tool_selection && this.addForm.valid) {
      this.createJSON(addattack);
      // addattack.comment = this.consolidatedComment
      addattack.comment =
        this.addForm.controls["comment"].value != null
          ? this.addForm.controls["comment"].value
          : "";
      addattack.script = this.addForm.controls["jsondata"].value;
      addattack.support = this.isSupported;
    }
    ////////////////
    if (
      this.selectedItems.length != 0 &&
      addattack.script &&
      this.IsJsonString(addattack.script)
    ) {
      if (this.modal_header == "Edit") {
        addattack.attack_id = this.attack_id;
        this.updateAttack(addattack);
      } else {
        this.addAttack(addattack);
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
  save(content: any) {}

  open(content: any) {
    this.modal_header = AppConstantsComponent.ADD;
    this.isFileUploaded = false;
    this.disableFileUpload = true;
    this.addForm.controls["jsondata"].reset();
    this.addForm.controls["comment"].reset();
    this.getTechId();
    this.isTechIdDisabled = false;
    this.consolidatedComment = "";

    this.clearInputMethod();
    this.selectedItems = [];
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        size: "lg",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

          if (result) {
            var checkbx = "no";
            if (this.addForm.controls["support"].value) {
              checkbx = "yes";
            }

            var addattack = {
              script: this.addForm.controls["jsondata"].value,
              pre_requisite: this.addForm.controls["pre_requisite"].value,
              file_name: this.addForm.controls["file_name"].value,
              script_type: this.addForm.controls["script_type"].value,
              comment: this.addForm.controls["comment"].value,
              pre_command: this.addForm.controls["pre_command"].value,
              command: this.addForm.controls["command"].value,
              post_command: this.addForm.controls["post_command"].value,
              cleanup: this.addForm.controls["cleanup"].value,
              ability_name: this.addForm.controls["ability_name"].value,
              execution_status: this.addForm.controls["execution_status"].value,
              tool_selection: this.addForm.controls["tool_selection"].value,
              executor_selection:
                this.addForm.controls["executor_selection"].value,
              platform: this.addForm.controls["platform"].value,
              sub_technique_id: this.selectedItems,
            };
            this.createJSON(addattack);
          }
        },
        (reason) => {
          this.selectedItems = [];
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  viewJson(jsonView: any, tableRow: any){
    this.jsonValue = this.jsonpipe.transform(JSON.parse(tableRow.script));
    this.textValue = JSON.parse(tableRow.script);
    this.techId = tableRow.sub_technique_id;
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

  update(updateContent: any, tableRow: any) {
    this.isFileUploaded = false;
    this.disableFileUpload = true;
    this.modal_header = AppConstantsComponent.EDIT;
    this.getTechId();
    this.isTechIdDisabled = true;
    var checkbx = false;
    if (tableRow.support == "yes") {
      checkbx = true;
      this.isSupported = "yes";
    } else {
      this.isSupported = "no";
    }
    var parsedScript = JSON.parse(tableRow.script);
    this.addForm.controls["jsondata"].setValue(
      this.jsonpipe.transform(parsedScript)
    );
    // this.addForm.controls['comment'].setValue(tableRow.comment);
    this.modalContent = {
      attack_id: tableRow.attack_id,
      jsondata: tableRow.script,
      pre_requisite: tableRow.pre_requisite,
      pre_command: tableRow.pre_command,
      command: tableRow.command,
      post_command: tableRow.post_command,
      script_type: tableRow.script_type,
      sub_technique_id: tableRow.sub_technique_id,
      file_name: tableRow.file_name,
      comment: tableRow.comment,
      cleanup: tableRow.cleanup,
      abiity_name: tableRow.abiity_name,
      execution_status: tableRow.execution_status,
      tool_selection: tableRow.tool_selection,
      executor_selection: tableRow.executor_selection,
      platform: tableRow.platform,
    };

    this.selectedItems = [];
    if (tableRow.sub_technique_id != "") {
      var temp: string = tableRow.sub_technique_id + "";
      this.selectedItems = temp.split(",");
    }
    this.attack_id = tableRow.attack_id;
    this.consolidatedComment = tableRow.comment;
    this.clearInputMethod();
    this.addForm.controls["comment"].setValue(this.consolidatedComment);
    this.getPlatformDetails(this.selectedItems[0]);
    this.modalService
      .open(updateContent, {
        ariaLabelledBy: "modal-basic-title",
        backdrop: "static",
        size: "lg",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result) {
            var checkbx = "no";
            if (result.support) {
              checkbx = "yes";
            }
            this.modalContent = {
              attack_id: tableRow.attack_id,
              jsondata: result.script,
              pre_requisite: result.pre_requisite,
              script_type: result.script_type,
              sub_technique_id: tableRow.sub_technique_id,
              file_name: result.file_name,
              comment: result.comment,
              support: checkbx,
            };
            this.updateAttack(this.modalContent);
          }
        },
        (reason) => {
          this.selectedItems = [];
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    this.toolSelectionArray = [];
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  multiFilterChange(filter: any, event: any) {
    this.searchTextInput = "";
    this.isFirstSearchTextInput = true;
    this.isFilterOption = true;
    if (event) {
      if (this.filterValues[filter.columnProp]) {
        this.filterValues[filter.columnProp] =
          this.filterValues[filter.columnProp] +
          "," +
          event.toString().trim().toLowerCase();
      } else {
        this.filterValues[filter.columnProp] = event
          .toString()
          .trim()
          .toLowerCase();
      }
      this.dataSource.filter = JSON.stringify(this.filterValues);
    }
  }

  onSelectAllDS(items: any) {}
  onItemDeSelectDS(items: any) {}

  // Custom filter method for Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      if (!filter.includes("{")) {
        if (
          data.script &&
          data.sub_technique_id &&
          data.comment &&
          data.mitre_version
        ) {
          if (
            data.script
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.comment
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.script && data.sub_technique_id && data.mitre_version) {
          if (
            data.script
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.sub_technique_id && data.comment && data.mitre_version) {
          if (
            data.comment
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.script && data.comment && data.mitre_version) {
          if (
            data.script
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.comment
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.script && data.sub_technique_id && data.comment) {
          if (
            data.script
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.comment
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.sub_technique_id && data.comment) {
          if (
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.comment
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.script && data.mitre_version) {
          if (
            data.script
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.mitre_version && data.comment) {
          if (
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.comment
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.script && data.mitre_version) {
          if (
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.script.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }
        if (data.sub_technique_id && data.mitre_version) {
          if (
            data.sub_technique_id
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.mitre_version
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        } else {
          if (
            data.sub_technique_id
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            data.script
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          ) {
            return true;
          }
        }

        return false;
      }

      // this is for UI left side filter options
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
        let tech_id = false;
        let tools_sel = false;
        let exec_sel = false;
        let support = false;
        let executionstatus = false;
        let platform = false;
        let mitre_version = false;
        let list = Object.keys(searchTerms);

        if (list.indexOf("tools") === -1) {
          tools_sel = true;
        }
        if (list.indexOf("mitre_version") === -1) {
          mitre_version = true;
        }
        if (list.indexOf("executor") === -1) {
          exec_sel = true;
        }
        if (list.indexOf("sub_technique_id") === -1) {
          tech_id = true;
        }
        if (list.indexOf("support") === -1) {
          support = true;
        }
        if (list.indexOf("executionstatus") === -1) {
          executionstatus = true;
        }
        if (list.indexOf("platform") === -1) {
          platform = true;
        }
        if (isFilterSet) {
          for (const col in searchTerms) {
            if (col == "tools") {
              if (data["script"]) {
                try {
                  var jsondata = JSON.parse(data["script"]);
                  let tool_selection_keys: any[] = Object.keys(
                    jsondata.extensions["x-acds-attack-ext"]["x-tool-names"]
                  );

                  for (var i = 0; i < tool_selection_keys.length; i++) {
                    for (let elem of searchTerms[col].split(",")) {
                      if (tool_selection_keys[i].toLowerCase() == elem) {
                        tools_sel = true;
                      }
                    }
                  }
                } catch (e) {
                  console.log("json parse error");
                }
              }
            } else if (col == "executor") {
              if (data["script"]) {
                try {
                  var jsondata = JSON.parse(data["script"]);
                  let tool_selection_keys: any[] = Object.keys(
                    jsondata.extensions["x-acds-attack-ext"]["x-tool-names"]
                  );

                  for (var j = 0; j < tool_selection_keys.length; j++) {
                    let tool_selection_array: any[] =
                      jsondata.extensions["x-acds-attack-ext"]["x-tool-names"][
                        tool_selection_keys[j]
                      ];

                    for (var i = 0; i < tool_selection_array.length; i++) {
                      let k: any[] = tool_selection_array[i]["executor"];
                      for (var l = 0; l < k.length; l++) {
                        for (let elem of searchTerms[col].split(",")) {
                          if (k[l] != "") {
                            if (k[l].trim().toLowerCase() == elem) {
                              exec_sel = true;
                            }
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                  console.log("json parse error");
                }
              }
            } else if (col == "executionstatus") {
              if (data["script"]) {
                try {
                  var jsondata = JSON.parse(data["script"]);
                  let tool_selection_keys: any[] = Object.keys(
                    jsondata.extensions["x-acds-attack-ext"]["x-tool-names"]
                  );

                  for (var j = 0; j < tool_selection_keys.length; j++) {
                    let tool_selection_array: any[] =
                      jsondata.extensions["x-acds-attack-ext"]["x-tool-names"][
                        tool_selection_keys[j]
                      ];

                    for (var i = 0; i < tool_selection_array.length; i++) {
                      for (let elem of searchTerms[col].split(",")) {
                        if (tool_selection_array[i]["execution_status"] != "") {
                          if (
                            tool_selection_array[i][
                              "execution_status"
                            ].toLowerCase() == elem
                          ) {
                            executionstatus = true;
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                  console.log("json parse error");
                }
              }
            } else if (col == "platform") {
              if (data["script"]) {
                try {
                  var jsondata = JSON.parse(data["script"]);
                  let tool_selection_keys: any[] = Object.keys(
                    jsondata.extensions["x-acds-attack-ext"]["x-tool-names"]
                  );

                  for (var j = 0; j < tool_selection_keys.length; j++) {
                    let tool_selection_array: any[] =
                      jsondata.extensions["x-acds-attack-ext"]["x-tool-names"][
                        tool_selection_keys[j]
                      ];

                    for (var i = 0; i < tool_selection_array.length; i++) {
                      for (let elem of searchTerms[col].split(",")) {
                        if (tool_selection_array[i]["platform"] != "") {
                          if (
                            tool_selection_array[i]["platform"]
                              .trim()
                              .toLowerCase() == elem
                          ) {
                            platform = true;
                          }
                        }
                      }
                    }
                  }
                } catch (e) {
                  console.log("json parse error");
                }
              }
            }
            if (col == "sub_technique_id") {
              if (data[col]) {
                for (let elem of searchTerms[col].split(",")) {
                  if (
                    data[col].toString().toLowerCase() ==
                      elem.trim().toLowerCase() &&
                    isFilterSet
                  ) {
                    tech_id = true;
                  }
                }
              }
            }
            if (col == "mitre_version") {
              if (data[col]) {
                for (let elem of searchTerms[col].split(",")) {
                  if (
                    data[col].toString().toLowerCase() ==
                      elem.toLowerCase().trim().toLowerCase() &&
                    isFilterSet
                  ) {
                    mitre_version = true;
                  }
                }
              }
            }

            if (
              tools_sel &&
              exec_sel &&
              tech_id &&
              support &&
              executionstatus &&
              platform &&
              mitre_version
            ) {
              found = true;
            } else {
              found = false;
            }
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  applyPipeFilter(filterValue: any) {
    if (filterValue.target.value) {
      // if (this.isFilteredData) {
      if (this.isFilterOption && this.isFirstSearchTextInput) {
        this.dataSource.data = this.dataSource.filteredData;
        this.isFirstSearchTextInput = false;
      }
      filterValue = filterValue.target.value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.isFirstSearchTextInput = true;
      this.dataSource.filter = "";
      // if (!this.isMultiSelect) {
      //   this.search_here = "";
      //   console.log("***applyPipeFilter" + filterValue.target.value + " ::this.isMultiSelect- " + this.AttackList.length);
      //   this.dataSource.data = this.AttackList;
      //   this.dataSource.filter = "";
      // } else {
      //   console.log("else==")
      //   this.dataSource.data = this.dataSource.filteredData;
      //   this.dataSource.filter = "";
      //   // this.isFilteredData = true;
      // }
    }
  }
  filterColumn(event: any, head: any) {
    const colIndex = this.displayedColumns.findIndex((col) => col === head);

    if (colIndex >= 0 && event.target.checked == false) {
      // column is currently shown in the table, so we remove it
      this.displayedColumns.splice(colIndex, 1);
      this.duplicatelist[colIndex] = "";

      if (head == "sub_technique_id") {
        this.t_id = false;
      }
      if (head == "script") {
        this.scrpt = false;
      }

      if (head == "comment") {
        this.cmt = false;
      }

      if (head == "support") {
        this.spt = false;
      }
    } else {
      if (head == "sub_technique_id") {
        this.t_id = true;
      }
      if (head == "script") {
        this.scrpt = true;
      }

      if (head == "comment") {
        this.cmt = true;
      }

      if (head == "support") {
        this.spt = true;
      }

      let count = 0;
      for (let col of this.displayedColumns) {
        if (this.dictvar[head] < this.dictvar[col]) {
          this.displayedColumns.splice(count, 0, head);
          break;
        }
        if (
          this.dictvar[head] > this.dictvar[col] &&
          count >= this.displayedColumns.length
        ) {
          this.displayedColumns.splice(this.dictvar[head], 0, head);
          break;
        } else {
        }
        count += 1;
      }
    }
  }

  multiFilterDeSelect(filter: any, event: any) {
    var isModelValueUndefined = false;
    let filter_list = this.filterValues[filter.columnProp].split(",");

    for (var i = 0; i < filter_list.length; i++) {
      if (filter_list[i] === event.toString().trim().toLowerCase()) {
        filter_list.splice(i, 1);
      }
    }

    this.filterValues[filter.columnProp] = filter_list.join();
    this.dataSource.filter = JSON.stringify(this.filterValues);

    for (i = 0; i < this.filterSelectObj.length; i++) {
      if (
        this.filterSelectObj[i].modelValue == undefined ||
        this.filterSelectObj[i].modelValue.length == 0
      ) {
        isModelValueUndefined = true;
      } else {
        isModelValueUndefined = false;
        break;
      }
    }
    if (isModelValueUndefined) {
      this.isFilterOption = false;
      this.searchTextInput = "";
      this.dataSource.data = this.AttackList;
    }
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirmDelete(item, result);
      }
    });
  }

  confirmDelete(item: any, check: any) {
    if (check) {
      //put your delete method logic here
      this.service.deleteAttack(item).subscribe((vardata) => {
        this.refreshAttackList();
      });
    }
  }

  /****************file upload***********************/
  onFileChange(e: any) {
    this.fileUploaded = e.target.files[0];
    this.parseSourceFile(this.fileUploaded);
    this.isFileUploaded = true;
    this.addForm.controls["command"].setValue("NA");
    this.addForm.controls["cleanup"].setValue("NA");
  }

  doc: any;
  parseSourceFile(file: any) {
    const yaml = require("js-yaml");
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let fileName = yaml.load(event.target?.result);
      switch (this.selectedOptions) {
        case "atomicred":
          this.convertAtomicRedTeamJson(fileName);
          break;
        case "caldera":
          this.convertCalderaJson(fileName[0]);

          break;
      }
    });
    console.log(reader.readAsText(file));
    console.log(this.doc);
  }

  convertAtomicRedTeamJson(inputJson: any) {
    let addattackDetailsCopy = Object.assign({}, this.addattackDetails);
    try {
      if (inputJson["attack_technique"]) {
        addattackDetailsCopy.technique_ids = inputJson["attack_technique"];
        let testCaseArray = inputJson["atomic_tests"];
        testCaseArray.forEach((element: any) => {
          addattackDetailsCopy.ability_name = element.name;
          this.abilityName = element.name;
          let executor = JSON.parse(JSON.stringify(element.executor));
          this.selectedExecutorItems = executor.name;
          addattackDetailsCopy.executor_selection = this.selectedExecutorItems;
          if (executor.hasOwnProperty("cleanup_command")) {
            addattackDetailsCopy.cleanup = executor.cleanup_command;
            this.cleanupCommand = executor.cleanup_command;
          } else {
            addattackDetailsCopy.cleanup = "NA";
          }
          if (executor.hasOwnProperty("command")) {
            addattackDetailsCopy.command = executor.command;
          }
          if (element.hasOwnProperty("input_arguments")) {
            let inputArgART = JSON.parse(
              JSON.stringify(element.input_arguments)
            );

            for (const [key, value] of Object.entries(inputArgART)) {
              let inputArgVal = JSON.parse(JSON.stringify(value));
              this.inputArgArray.push({
                id: this.inputArgArray.length + 1,
                key: key,
                value: inputArgVal.default,
              });
            }
          }

          if (element.hasOwnProperty("dependencies")) {
            let dependenciesArr = JSON.parse(
              JSON.stringify(element.dependencies)
            );
            dependenciesArr.forEach((dependencies_element: any) => {
              let dependencyElement = JSON.parse(
                JSON.stringify(dependencies_element)
              );
              addattackDetailsCopy.pre_requisite =
                dependencyElement.prereq_command;
            });
          } else {
            addattackDetailsCopy.pre_requisite = null;
          }
          let supportedPlatformsArr = JSON.parse(
            JSON.stringify(element.supported_platforms)
          );
          supportedPlatformsArr.forEach((platform_element: any) => {
            addattackDetailsCopy.platform = JSON.parse(
              JSON.stringify(platform_element)
            );
            this.platform = addattackDetailsCopy.platform;
          });

          addattackDetailsCopy.tool_selection = this.selectedOptions;
          this.executorSelectionData =
            this.addForm.controls["execution_status"].value != null
              ? this.addForm.controls["execution_status"].value
              : "";
          addattackDetailsCopy.execution_status = this.executorSelectionData;
          this.createJSON(addattackDetailsCopy);
          this.isTechIdDisabled = true;
          this.clearInputField();
        });
      } else {
        alert("Please choose the correct file");
      }
    } catch (error) {
      alert("Please choose the correct file");
    }
  }

  clearInputField() {
    this.cleanupCommand = "";
    this.abilityName = "";
    this.selectedExecutorItems = "";
    this.platform = "";
    this.attack_technique = "";
    this.executorSelectionData = "";
    // this.selectedOptions="";
  }
  convertCalderaJson(inputJson: any) {
    let calderaAttackDetails = Object.assign({}, this.addattackDetails);
    let calderaExecutorArray: any[] = [];
    console.log("caldera inputJson " + inputJson);
    try {
      if (inputJson.platforms) {
        for (const [key, value] of Object.entries(inputJson.platforms)) {
          this.platform = key;
          calderaAttackDetails.platform = this.platform;
          let platformVal: any = value;
          for (const [key, value] of Object.entries(platformVal)) {
            calderaExecutorArray.push(key);
            calderaAttackDetails.executor_selection = calderaExecutorArray;
            let exeVal: any = value;
            calderaAttackDetails.cleanup = exeVal.cleanup;
            calderaAttackDetails.command = exeVal.command;
          }
          calderaExecutorArray = [];
          this.selectedExecutorItems = "";
          if (inputJson.technique) {
            this.attack_technique = inputJson.technique.attack_id;
            this.abilityName = inputJson.technique.name;
          } else {
            alert("Please choose the correct file");
          }
          calderaAttackDetails.tool_selection = this.selectedOptions;
          this.executorSelectionData =
            this.addForm.controls["execution_status"].value != null
              ? this.addForm.controls["execution_status"].value
              : "";
          calderaAttackDetails.execution_status = this.executorSelectionData;
          calderaAttackDetails.technique_ids = this.attack_technique;
          calderaAttackDetails.ability_name = this.abilityName;
          this.createJSON(calderaAttackDetails);
          this.isTechIdDisabled = true;
          this.clearInputField();
        }
      } else {
        alert("Please choose the correct file");
      }
    } catch (error) {
      alert("Please choose the correct file");
    }
  }
}
