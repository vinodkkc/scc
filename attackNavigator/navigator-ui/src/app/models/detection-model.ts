// import { CrudoperationService } from 'src/app/services/crudoperation.service';
import { Injectable } from "@angular/core";
import { Adapter } from "./detection-adapter";


export class Detection{
    detectionId: number;
    script: string;
    support: string;
    comment: string;
    subTechniqueId: string;
    scriptType: string;
    dataSource: string;
    color: string;
    attributes: JSON;
    mitreVersion: string;
    modyifyDate: Date;
    
    constructor(
        detectionId: number,
        script: string,
        support: string,
        comment: string,
        subTechniqueId: string,
        scriptType: string,
        dataSource: string,
        color: string,
        attributes: JSON,
        mitreVersion: string,
        modyifyDate: Date,
    ){
        this.detectionId= detectionId;
        this.script= script;
        this.support= support;
        this.comment= comment;
        this.subTechniqueId= subTechniqueId;
        this.scriptType= scriptType;
        this.dataSource= dataSource;
        this.color= color;
        this.attributes= attributes;
        this.mitreVersion= mitreVersion;
        this.modyifyDate= modyifyDate;
    }

    // constructor(private service: CrudoperationService) {
    //     // call api service to get all list and covert it in angular format
    //     let data: any = this.service.getDetectionList();
    //     console.log("model: ", data);
    //     this.detection_id = data.detection_id;
    //     this.script = data.script;
    //     this.support = data.support;
    //     this.comment = data.comment;
    //     this.technique_ids = data.technique_ids;
    //     this.script_type = data.script_type;

    // }
}

@Injectable({
    providedIn: "root",
  })
  export class DetectionAdapter implements Adapter<Detection> {
    adapt(item: any): Detection {
        return new Detection(
            item.detection_id,
            item.script,
            item.support, 
            item.comment, 
            item.sub_technique_id, 
            item.script_type, 
            item.data_source, 
            item.color,
            item.attributes,
            item.mitre_version,
            item.modify_date);
    }

    getDetectionObject(item: any): any {
        let detectionObj = {
            "detection_id": item.detectionId,
            "script": item.script,
            "script_type": item.scriptType,
            "data_source": item.dataSource,
            "support": item.support,
            "comment": item.comment,
            "attributes": item.attributes,
            "color": item.color,
            "sub_technique_id": item.subTechniqueId
          }
        return detectionObj;
    }

    
  }