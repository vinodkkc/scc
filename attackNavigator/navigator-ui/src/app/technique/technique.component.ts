import { Component, OnInit } from '@angular/core';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobalConstantsComponent } from '../global-constants/global-constants/global-constants.component';


@Component({
  selector: 'app-technique',
  templateUrl: './technique.component.html',
  styleUrls: ['./technique.component.css']
})
export class TechniqueComponent implements OnInit {

  constructor(private service: CrudoperationService, private modalService: NgbModal) { }

  techniqueList: any = [];
  filterMetadata = { count: 0 };
  filterRecord = 0;
  searchText: string;
  displayedColumns: string[] = ['Tactic id', 'Technique id', 'Mitre Version', 'Technique Name', 'Sub Technique id', 'Sub Technique Name', 'Data Source', 'Platform'];
  id: any;
  randm: any = [];
  detectionColor = GlobalConstantsComponent.detection_color;
  closeResult = '';
  script = '';
  colorinfo: any;
  modalContent: any;

  ngOnInit(): void {
    this.refreshTechniqueList();
  }

  ngDoCheck2() {
    this.filterRecord = this.filterMetadata.count
    return true
  }

  refreshTechniqueList() {
    this.service.getTechniqueList().subscribe(data => {
      this.techniqueList = data;
    });
  }

  replaceChar(str: any, find: any, replace: any) {
    if (str != null) {
      for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
      }
    }
    return str
  }


  //##### Add/edit/delete is not required in Technique, So commenting related code #####

  // updateTechnique(item: any) {
  //   var techvar = {
  //     'technique_id': item.technique_id,
  //     'technique_name': item.technique_name,
  //     'sub_technique_id': item.sub_technique_id,
  //     'sub_technique_name': item.sub_technique_name,
  //     'combine_tech_id': item.combine_tech_id,
  //     'tactic_id': item.tactic_id,
  //     'os_type': item.os_type,
  //     'mitre_version': item.mitre_version,
  //     'color': item.color,
  //     'data_source': item.data_source
  //   }
  //   this.service.updateTechnique(techvar).subscribe(vardata => {
  //     var a = JSON.parse(JSON.stringify(vardata));
  //     this.id = a.technique_id;
  //     this.refreshTechniqueList();
  //   });

  // }

  // deleteClick(item: any) {
  //   this.service.deleteTechnique(item).subscribe(vardata => {
  //     this.refreshTechniqueList();
  //   });

  // }

  // update(updateContent: any, tableRow: any) {

  //   this.modalContent = {
  //     technique_id: tableRow.technique_id,
  //     technique_name: tableRow.technique_name,
  //     sub_technique_id: tableRow.sub_technique_id,
  //     sub_technique_name: tableRow.sub_technique_name,
  //     combine_tech_id: tableRow.combine_tech_id,
  //     tactic_id: tableRow.tactic_id,
  //     os_type: tableRow.os_type,
  //     color: tableRow.color,
  //     mitre_version: tableRow.mitre_version,
  //     data_source: tableRow.data_source,
  //   };
  //   this.modalService.open(updateContent, { ariaLabelledBy: 'modal-basic-title', }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     this.modalContent = {
  //       technique_id: result.technique_id,
  //       technique_name: result.technique_name,
  //       sub_technique_id: result.sub_technique_id,
  //       sub_technique_name: result.sub_technique_name,
  //       combine_tech_id: tableRow.combine_tech_id,
  //       tactic_id: result.tactic_id,
  //       os_type: result.os_type,
  //       color: result.color,
  //       mitre_version: result.mitre_version,
  //       data_source: result.data_source,
  //     };
  //     this.updateTechnique(this.modalContent);

  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}

