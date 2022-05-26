import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Detection, DetectionAdapter } from 'src/app/models/detection-model';
import { GlobalConstantsComponent } from '../global-constants/global-constants/global-constants.component';

@Injectable({
  providedIn: 'root'
})
export class CrudoperationService {
  
  readonly APIUrl = GlobalConstantsComponent.APIUrl;

  constructor(
    private http:HttpClient, 
    private httpm:HttpClientModule,
    private adapter: DetectionAdapter
    ) { }

  getDetectionList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Detection/').pipe(
      map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    );
  }

  getCount():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/get_count/');
  }

  getDetectionSingleItem(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Detection/' + val);
  }

  addDetection(val:any){
    return this.http.post(this.APIUrl + '/Detection/', val);
  }

  updateDetection(val:any){
    return this.http.put(this.APIUrl + '/Detection/' + val.detection_id + '/', val);
  }

  deleteDetection(val:any){
    return this.http.delete(this.APIUrl + '/Detection/' + val);
  }

  getAttackList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Attacks/');
  }

  getAttackSingleItem(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Attacks/' + val);
  }

  addAttack(val:any){
    return this.http.post(this.APIUrl + '/Attacks/', val);
  }

  updateAttack(val:any){
    return this.http.put(this.APIUrl + '/Attacks/' + val.attack_id + '/', val);
  } 

  deleteAttack(val:any){
    return this.http.delete(this.APIUrl + '/Attacks/' + val);
  }

  getTacticList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Tactic/');
  }

  getTacticSingleItem(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Tactic/' + val);
  }

  addTactic(val:any){
    return this.http.post(this.APIUrl + '/Tactic/', val);
  }

  updateTactic(val:any){
    return this.http.put(this.APIUrl + '/Tactic/' + val.tactic_id + '/', val);
  } 

  deleteTactic(val:any){
    return this.http.delete(this.APIUrl + '/Tactic/' + val);
  }

  getTechniqueList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Technique/');
  }

  getTechniqueSingleItem(val:any):Observable<any[]>{
     return this.http.get<any>(this.APIUrl + '/Technique/' + val + '/')
  }

  addTechnique(val:any){
    return this.http.post(this.APIUrl + '/Technique/', val);
  }

  updateTechnique(val:any){
    return this.http.put(this.APIUrl + '/Technique/' + val.combine_tech_id + '/', val);
  } 

  deleteTechnique(val:any){
    return this.http.delete(this.APIUrl + '/Technique/' + val);
  }

  getMitigationList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/Mitigation/');
  }

  getMitigationSingleItem(val:any):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Mitigation/' + val);
  }

  addMitigation(val:any){
    return this.http.post(this.APIUrl + '/Mitigation/', val);
  }

  updateMitigation(val:any){
    return this.http.put(this.APIUrl + '/Mitigation/' + val.mitigate_id + '/', val);
  } 

  deleteMitigation(val:any){
    return this.http.delete(this.APIUrl + '/Mitigation/' + val);
  }

  getTechniqueIds(){
    return this.http.get(this.APIUrl + '/id_list/');
  }

  getUniqueDecTechIds(){
    return this.http.get(this.APIUrl + '/get_unique_dec_tech_ids/');
  }

  getUniqueTechniqueIds(){
    return this.http.get(this.APIUrl + '/get_unique_technique_ids/');
  }

  getUniqueDataSource(){
    return this.http.get(this.APIUrl + '/get_unique_ds/');
  }

  addAttckTechnique(val:any){
    return this.http.post(this.APIUrl + '/TechniqueAttack/', val);
  }

  deleteAttckTechnique(val:any){
    return this.http.put(this.APIUrl + '/delete_attack_technique/', val);
  }

  addDetectionTechnique(val:any){
    return this.http.post(this.APIUrl + '/TechniqueDetection/', val);
  }

  deleteDeletectionTechnique(val:any){
    return this.http.put(this.APIUrl + '/delete_detection_technique/', val);
  }

  addMitigationTechnique(val:any){
    return this.http.post(this.APIUrl + '/TechniqueMitigation/', val);
  }

  deleteMitigationTechnique(val:any){
    return this.http.put(this.APIUrl + '/delete_mitigation_technique/', val);

  }

  getColorInfo(val: any){
    return this.http.post(this.APIUrl + '/get_color_info/', val);
    
  }

  getPlatformDetails(val: any){
    var body = {
      'data':val
    }
    return this.http.post(this.APIUrl + '/get_platform_details/', body, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  exportJson(val: any){
    return this.http.get(this.APIUrl + '/export_json/' + val);
  }
} 
