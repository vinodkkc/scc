import { Pipe, PipeTransform } from '@angular/core';
import { Attacks } from './models/attacks-model';

@Pipe({
  name: 'toggleattack'
})
export class ToggleattackPipe implements PipeTransform {

  transform(AttacknList: Attacks[], searchText: string): Attacks[] {

    if (!AttacknList || !searchText) {
      console.log("empty..!!!");
      return AttacknList;
    }

    return AttacknList.filter(Boolean).filter((dataItem: Attacks) => {

      if (searchText == "true" && dataItem.support && dataItem.support.toLocaleLowerCase() == 'yes') {
        console.log(' filter testing....')
        return dataItem.support.toString().toLocaleLowerCase().includes("yes")
      }
      if (searchText == "false"){
        console.log(' noo  filter testing....')
        return AttacknList;
      }
      else {
        return
      }
    });

  }

}
