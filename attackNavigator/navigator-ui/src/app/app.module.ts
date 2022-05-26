import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ColorPickerModule } from 'ngx-color-picker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrudoperationService } from './services/crudoperation.service';
import { AttackComponent } from './attack/attack.component';
import { TechniqueComponent } from './technique/technique.component';
import { TacticComponent } from './tactic/tactic.component';
import { DetectionComponent } from './detection/detection.component';
import { MitigationComponent } from './mitigation/mitigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { SearchattackPipe } from './searchattack.pipe';
import { SearchtechniquePipe } from './searchtechnique.pipe';
import { SearchmitigationPipe } from './searchmitigation.pipe';
import { SearchtacticPipe } from './searchtactic.pipe';
import { ToggleattackPipe } from './toggleattack.pipe';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableExporterModule } from 'mat-table-exporter';
import { GlobalConstantsComponent } from './global-constants/global-constants/global-constants.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe, JsonPipe } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule  } from '@angular/material/checkbox';
import { AppConstantsComponent } from './app-constants/app-constants.component';
import { ConformationDialogComponent } from './conformation-dialog/conformation-dialog.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DataCrudComponent } from './data-crud/data-crud.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgxJsonViewerModule } from 'ngx-json-viewer';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'rgba(12,80,219,0.98)',
  bgsOpacity: 1,
  bgsPosition: POSITION.centerCenter,
  bgsSize: 50,
  bgsType: SPINNER.ballSpinClockwise,
  masterLoaderId: "master",
  fgsColor: 'rgba(12,80,219,0.98)',
  fgsPosition: POSITION.centerCenter
};



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AttackComponent,
    TechniqueComponent,
    TacticComponent,
    DetectionComponent,
    MitigationComponent,
    SearchattackPipe,
    SearchtechniquePipe,
    SearchmitigationPipe,
    SearchtacticPipe,
    ToggleattackPipe,
    GlobalConstantsComponent,
    AppConstantsComponent,
    ConformationDialogComponent,
    DataCrudComponent,
    SearchFilterComponent
  ],
  imports: [
    BrowserModule,
    TooltipModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableExporterModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    ChartsModule,
    MatTabsModule,
    NgxMatSelectSearchModule,
    NgbAccordionModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [
    CrudoperationService, 
    JsonPipe, 
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
