import { Component, OnInit } from '@angular/core';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tactic',
  templateUrl: './tactic.component.html',
  styleUrls: ['./tactic.component.css']
})
export class TacticComponent implements OnInit {

  constructor(private service: CrudoperationService, private modalService: NgbModal) { }

  tacticList: any = [];
  searchText: string;
  id: any;
  closeResult = '';
  script = '';
  modalContent: any;
  displayedColumns: string[] = ['tactic_id', 'tactic_name', 'delete(disabled)'];

  ngOnInit(): void {
    this.refreshTacticList();
  }
  
  deleteClick(item: any) {
    console.log("deleting..." + item);
    this.service.deleteTactic(item).subscribe(vardata => {
      this.refreshTacticList();
    });

  }

  refreshTacticList() {
    this.service.getTacticList().subscribe(data => {
      this.tacticList = data;
    });
  }

}
