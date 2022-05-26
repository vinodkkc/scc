import { Pipe, PipeTransform } from '@angular/core';
import { Attacks } from './models/attacks-model'

@Pipe({
  name: 'searchattack'
})
export class SearchattackPipe implements PipeTransform {

  transform(AttackList: Attacks[], searchText: string): Attacks[] {
    if(!AttackList || !searchText){
      // console.log("empty..!!!");
      return AttackList; 
    }
    return AttackList.filter(Boolean).filter((dataItem: Attacks) => {
      if(dataItem.attack_id && dataItem.script && dataItem.pre_requisite && dataItem.technique_ids 
        && dataItem.comment && dataItem.script_type && dataItem.file_name){
        console.log("11 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.file_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.pre_requisite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.pre_requisite && dataItem.technique_ids 
        && dataItem.comment && dataItem.script_type && !dataItem.file_name){
        console.log("10 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.pre_requisite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.pre_requisite && dataItem.technique_ids 
        && dataItem.comment && !dataItem.script_type && dataItem.file_name){
        console.log("9 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.file_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.pre_requisite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && !dataItem.pre_requisite && dataItem.technique_ids 
        && dataItem.comment && dataItem.script_type && dataItem.file_name){
        console.log("8 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.file_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.pre_requisite && dataItem.technique_ids 
        && !dataItem.comment && dataItem.script_type && dataItem.file_name){
        console.log("7 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.file_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.pre_requisite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.pre_requisite && !dataItem.technique_ids 
        && dataItem.comment && dataItem.script_type && dataItem.file_name){
        console.log("6 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.file_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.pre_requisite.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.technique_ids && dataItem.comment && dataItem.script_type){
        console.log("5 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.technique_ids && dataItem.comment && !dataItem.script_type){
        console.log("4 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.comment.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.technique_ids && !dataItem.comment && dataItem.script_type){
        console.log("3 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.script_type.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      if(dataItem.attack_id && dataItem.script && dataItem.technique_ids){
        console.log("2 if not empty..!!!");
        return dataItem.script.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.technique_ids.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }

      else{
        console.log(" 1 ..!!!");
        return dataItem.attack_id.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      }
    });
  }
}