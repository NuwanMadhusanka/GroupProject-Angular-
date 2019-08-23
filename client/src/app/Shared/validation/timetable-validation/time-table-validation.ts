import { Time } from '@angular/common';


export class TimeTableValidation {

    regExp:any;
    test:Boolean

    constructor() { }
    
    isValidTimeSlot(time:Date){
       if(time != null){
        this.regExp =new RegExp('\^(0?[1-9]|1[012]):[0-5][0-9]:[0-5][0-9]$');
        this.test=this.regExp.test(time);
        if(time) {return true;}
       }
       return false;
    }

  
  }
  