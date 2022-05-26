import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-global-constants',
  templateUrl: './global-constants.component.html',
  styleUrls: ['./global-constants.component.css']
})
export class GlobalConstantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // public static APIUrl: string = "http://10.11.92.191:8012";
  // public static APIUrl: string = "http://10.11.92.191:8012";
  public static APIUrl: string = environment.backendAPI;

  // public static navigationUrl: string = "http://10.11.92.191:4200/#layerURL=";
  public static navigationUrl: string = environment.matrixUI;

  // public static APIUrl: string = "http://127.0.0.1:8000";
  // public static navigationUrl: string = "http://localhost:4242/#layerURL=";


  public static detection_color: string = '#8ddd25';

}
