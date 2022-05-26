import { Component, OnInit } from '@angular/core';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppConstantsComponent } from "../app-constants/app-constants.component";


@Component({
  selector: 'app-mitigation',
  templateUrl: './mitigation.component.html',
  styleUrls: ['./mitigation.component.css']
})
export class MitigationComponent implements OnInit {

  constructor(private service: CrudoperationService, private modalService: NgbModal) { }

  constMitigationId = AppConstantsComponent.MITIGATION_ID;
  constMitigationName = AppConstantsComponent.MITIGATION_NAME;
  constDescription = AppConstantsComponent.MITIGATION_DESCRIPTION;
  constTechniqueId = AppConstantsComponent.MITIGATION_TECH_ID;
  constSearchHere = AppConstantsComponent.SEARCH_HERE;
  constSearch = AppConstantsComponent.SEARCH;
  constEdit = AppConstantsComponent.EDIT;
  
  filterMetadata = { count: 0 };
  filterRecord = 0;
  mitigationList: any = [];
  searchText: string;
  allTechIds: any = [];
  selectedItems: any = [];
  unselectedItems: any = [];
  allTechIdsdict: any;
  dropdownSettings: IDropdownSettings = {};
  displayedColumns: string[] = ['Mitigation Id', 'Mitigation Name', 'Description', 'Technique id', 'Edit'];
  temp_id: any;
  id: any;
  closeResult = '';
  script = '';
  modalContent: any;

  ngOnInit(): void {
    this.refreshMitigationList();
    this.getTechId();
    this.temp_id = '';
  }

  ngDoCheck2() {
    this.filterRecord = this.filterMetadata.count
    return true
  }

  refreshMitigationList() {
    this.service.getMitigationList().subscribe(data => {
      this.mitigationList = data;
    });
  }

  getTechId() {

    this.service.getTechniqueIds().subscribe(data => {
      this.allTechIds = data;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    try {
      this.unselectedItems.pop(item);
    } catch (error) {
      console.log("unselected array error: " + error);
    }
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onItemDeSelect(items: any) {
    this.unselectedItems.push(items);
    console.log(this.selectedItems);
  }

  updateMitigation(item: any) {
    console.log("&&& " + item.support)

    var mitigate = {
      'mitigate_id': item.mitigate_id,
      'mitigate_name': item.mitigate_name,
      'description': item.description,
      'brief_info': item.brief_info,
      'support': item.support
    }
    this.service.updateMitigation(mitigate).subscribe(vardata => {
      var a = JSON.parse(JSON.stringify(vardata));
      console.log(a.mitigate_id)
      this.id = a.mitigate_id;

      var temp = item.technique_ids + '';
      var temparray = temp.split(',');
      for (let idtech of this.selectedItems) {
        if (!(temparray.includes(idtech))) {
          this.service.addMitigationTechnique({ 'mitigate': item.mitigate_id, 'combine_tech': idtech }).subscribe(vardata => {
          });
        }
      }

      for (let idtech of this.unselectedItems) {
        this.service.deleteMitigationTechnique({ 'mitigate': item.mitigate_id, 'combine_tech': idtech }).subscribe(vardata => {
        });

      }

      this.refreshMitigationList();
    },
      err => {
        console.log("Server Error: " + err);
        if (err.status == 500) {
          console.log(err.message);
          alert("500 Internal Server Error");
        }
      });

  }

  deleteClick(item: any) {
  }

  update(updateContent: any, tableRow: any) {
    var checkbx = false;
    if (tableRow.support == "yes") {
      checkbx = true;
    }
    this.modalContent = {
      mitigate_id: tableRow.mitigate_id,
      mitigate_name: tableRow.mitigate_name,
      description: tableRow.description,
      brief_info: tableRow.brief_info,
      technique_ids: tableRow.technique_ids,
      support: checkbx
    };

    this.selectedItems = [];
    if (tableRow.technique_ids != "") {
      var temp: string = tableRow.technique_ids + '';
      this.selectedItems = temp.split(',');
    }
    this.modalService.open(updateContent, { ariaLabelledBy: 'modal-basic-title', }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("result: ", result)
      if (result) {
        var checkbx = "no";
        if (result.support) {
          checkbx = "yes";
        }
        this.modalContent = {
          mitigate_id: result.mitigate_id,
          technique_ids: result.technique_ids,
          mitigate_name: result.mitigate_name,
          description: result.description,
          brief_info: result.brief_info,
          support: checkbx
        };
        this.updateMitigation(this.modalContent);
      }
    }, (reason) => {
      this.selectedItems = [];
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
