// import { Pipe, PipeTransform } from '@angular/core';
// import { Detection } from './models/detection-model';

// @Pipe({
//   name: 'toggledetection'
// })
// export class ToggledetectionPipe implements PipeTransform {

//   transform(DetectionList: Detection[], searchText: string): Detection[] {

//     if (!DetectionList || !searchText) {
//       console.log("empty..!!!");
//       return DetectionList;
//     }

//     return DetectionList.filter(Boolean).filter((dataItem: Detection) => {

//       if (searchText == "true" && dataItem.support && dataItem.support.toLocaleLowerCase() == 'yes') {
//         // console.log(' filter testing....')
//         return dataItem.support.toString().toLocaleLowerCase().includes("yes")
//       }
//       if (searchText == "false"){
//         // console.log(' noo  filter testing....')
//         return DetectionList;
//       }
//       else {
//         return
//       }
//     });

//   }
// }
