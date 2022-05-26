// import { Pipe, PipeTransform, Input } from '@angular/core';
// import { Detection } from './models/detection-model';
// import { DetectionComponent } from './detection/detection.component';

// @Pipe({
//   name: 'searchfilter'
// })
// export class SearchfilterPipe implements PipeTransform {
  
//   transform(DetectionList: Detection[], searchText: string): Detection[] {
    
//     if(!DetectionList || !searchText){
//       console.log("empty..!!!");
//       return DetectionList;
//     }
//     // console.log("not empty..!!!");
//     return DetectionList.filter(Boolean).filter((dataItem: Detection) => {

//   //   if(true){
//   //   if(dataItem.support && dataItem.support.toLocaleLowerCase() == 'yes'){
//   //     console.log('testing....')
//   //     return dataItem.support.toString().toLocaleLowerCase().includes("yes")
//   //   }
//   //   else{
//   //     return
//   //   }
//   // }

//     if(dataItem.detection_id && dataItem.script && dataItem.data_source && dataItem.technique_ids 
//       && dataItem.comment && dataItem.script_type){
//       // console.log("12 if not empty..!!!");
//       return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//       dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     }
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.comment && dataItem.data_source) {
//         // console.log(" 11 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     } 
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.script_type && dataItem.data_source) {
//         // console.log(" 10 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     } 
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.script_type && dataItem.comment) {
//         // console.log(" 9 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     } 
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.script_type) {
//         // console.log(" 8 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     } 
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.data_source) {
//         // console.log(" 7 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     } 
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids 
//       && dataItem.comment) {
//         // console.log(" 6 ..!!!");
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
//     }
//     if (dataItem.detection_id && dataItem.script && dataItem.technique_ids)  {
//         console.log(" 5 ..!!!", dataItem.technique_ids);
//         return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//         dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//         dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     }
//     if (dataItem.detection_id && dataItem.script && dataItem.data_source)  {
//       // console.log(" 4 ..!!!");
//       return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//       dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     }
//     if (dataItem.detection_id && dataItem.script && dataItem.script_type)  {
//       // console.log(" 3 ..!!!");
//       return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//       dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     }
//     if (dataItem.detection_id && dataItem.script && dataItem.comment)  {
//       console.log(" 2 ..!!!");
//       return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
//       dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
//       dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
//     }
//     else{
//       console.log(" 1 ..!!!", dataItem.detection_id.toString());
//       return dataItem.detection_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
//     }
    
//   });
//   }

// }
