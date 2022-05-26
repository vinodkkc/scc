import { Pipe, PipeTransform } from '@angular/core';
import { Mitigation } from './models/mitigation.model';


@Pipe({
  name: 'searchmitigation'
})
export class SearchmitigationPipe implements PipeTransform {

  transform(mitigationList: Mitigation[], searchText: string,filterMetadata:any): Mitigation[] {
    if(!mitigationList || !searchText){
      // console.log("empty..!!!");
      return mitigationList; 
    }

    let filteredItems =  mitigationList.filter(Boolean).filter((dataItem: Mitigation) => {

      if(dataItem.mitigate_id && dataItem.mitigate_name && dataItem.description 
        && dataItem.brief_info && dataItem.technique_ids){
        // console.log("12 if not empty..!!!");
        return dataItem.mitigate_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitigate_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.brief_info.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
      }

      if(dataItem.mitigate_id && dataItem.mitigate_name && dataItem.description 
        && dataItem.brief_info && !dataItem.technique_ids){
        // console.log("12 if not empty..!!!");
        return dataItem.mitigate_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitigate_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.brief_info.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) 
      }

      if(dataItem.mitigate_id && dataItem.mitigate_name && dataItem.description 
        && !dataItem.brief_info && dataItem.technique_ids){
        // console.log("12 if not empty..!!!");
        return dataItem.mitigate_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitigate_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      else{
        return dataItem.mitigate_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitigate_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

    });
    filterMetadata.count = filteredItems.length;
    return filteredItems;

  }

}
