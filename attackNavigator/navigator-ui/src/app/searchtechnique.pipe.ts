import { Pipe, PipeTransform } from '@angular/core';
import { Technique } from './models/technique-model';

@Pipe({
  name: 'searchtechnique'
})
export class SearchtechniquePipe implements PipeTransform {

  transform(techniqueList: Technique[], searchText: string, filterMetadata:any): Technique[] {
    if(!techniqueList || !searchText){
      // console.log("empty..!!!");
      return techniqueList; 
    }
    let filteredItems = techniqueList.filter(Boolean).filter((dataItem: Technique) => {

      if(dataItem.technique_id && dataItem.technique_name && dataItem.sub_technique_id 
        && dataItem.sub_technique_name && dataItem.tactic_id && dataItem.data_source
        && dataItem.mitre_version){
        // console.log("12 if not empty..!!!");
        return dataItem.technique_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.sub_technique_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.sub_technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.tactic_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitre_version.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.technique_id && dataItem.technique_name && dataItem.sub_technique_id 
        && dataItem.sub_technique_name && dataItem.tactic_id && dataItem.mitre_version
        && !dataItem.data_source){
        // console.log("12 if not empty..!!!");
        return dataItem.technique_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.sub_technique_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.sub_technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitre_version.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.tactic_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.technique_id && dataItem.technique_name && !dataItem.sub_technique_id 
        && !dataItem.sub_technique_name && dataItem.tactic_id && dataItem.data_source
        && dataItem.mitre_version){
        // console.log("12 if not empty..!!!");
        return dataItem.technique_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.tactic_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitre_version.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.data_source.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      else{
        // console.log(" 1 ..!!!");
        return dataItem.technique_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.mitre_version.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.tactic_id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      
    });
    filterMetadata.count = filteredItems.length;
    return filteredItems;
  }

}
