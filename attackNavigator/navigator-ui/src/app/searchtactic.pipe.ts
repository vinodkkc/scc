import { Pipe, PipeTransform } from '@angular/core';
import { Tactic } from './models/tactic.model';

@Pipe({
  name: 'searchtactic'
})
export class SearchtacticPipe implements PipeTransform {

  transform(tacticList: Tactic[], searchText: string): Tactic[] {
    if (!tacticList || !searchText) {
      // console.log("empty..!!!");
      return tacticList;
    }

    return tacticList.filter(Boolean).filter((dataItem: Tactic) =>
      dataItem.tactic_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      dataItem.tactic_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );

  }

}
