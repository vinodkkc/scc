import { Component, OnInit, ViewChild } from '@angular/core';
// import { from } from 'rxjs';

// import { Detection } from 'src/app/models/detection-model';
// import { DetectionService } from 'src/app/services/detection.service';
import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { MatTableDataSource} from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { MdbTableDirective } from 'angular-bootstrap-md';
// import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: CrudoperationService, private modalService: NgbModal) { }

  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  countList: any;
  technique: any;
  attack: any;
  detection: any;
  attack_support: any;
  detection_support: any;
  // public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  // public pieChartData = [120, 150, 180, 90];
  public pieChartType:any = 'pie';

  public pieChartLabelsAttack: any = ["Supported", "Not-Supported"];
  public pieChartDataAttack: any = [0, 0];

  public pieChartLabelsDetection: any = ["Supported", "Not-Supported"];
  public pieChartDataDetection: any = [0, 0];

  public chartColorsAttack: any[] = [
    { 
      backgroundColor:["#f80019", '#b68ff7'] 
    }];
  
  public chartColorsDetection: any[] = [
    { 
      backgroundColor:["#0ff800", '#b68ff7'] 
    }];

  ngOnInit(): void {
    this.refreshCountList();
    this.refreshCountList();
  }


  refreshCountList() {
    this.service.getCount().subscribe(data => {
      this.countList = data;
      console.log("count: ", this.countList)
      this.technique = this.countList.technique;
      this.attack = this.countList.attack;
      this.detection = this.countList.detection;
      this.attack_support = this.countList.attack_support;
      this.detection_support = this.countList.detection_support;

      var attack_notsupport = this.attack - this.attack_support;
      var detection_notsupport = this.detection - this.detection_support;

      this.pieChartDataAttack = [this.attack_support, attack_notsupport];
      this.pieChartDataDetection = [this.detection_support, detection_notsupport];

    });
  }



}
