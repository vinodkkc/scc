import { Injectable } from "@angular/core";
import { Adapter } from "./detection-adapter";

export class Technique{
    technique_id: string
    technique_name: string
    sub_technique_id: string
    sub_technique_name: string
    tactic_id: string
    data_source: string
    os_type: string
    mitre_version: string
    color: string
    // detection_obj: Array<string>
    // attack_obj: Array<string>
    // mitigation_obj: Array<string>

    constructor() {
    }
}



// @Injectable({
//     providedIn: "root",
//   })
//   export class DetectionAdapter implements Adapter<Detection> {
//     adapt(item: any): Technique {
//         return new Technique(
//             item.technique_id,
//             item.technique_name,
//             item.sub_technique_id, 
//             item.sub_technique_name, 
//             item.sub_technique_id, 
//             item.tactic_id, 
//             item.data_source, 
//             item.os_type,
//             item.mitre_version,
//             item.color);
//     }

    // detectionObject(item: any): Detection {
    //     return 
    // }
//   }