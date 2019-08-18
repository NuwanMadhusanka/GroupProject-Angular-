
export class UserValidation {

  constructor() { }

  regExp:any;//Regular Expression
  test:Boolean

  //email validation
  public isValidEmail(email:String){
    this.regExp = new RegExp( /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
    this.test = this.regExp.test(email);
    if(this.test){
      return true;
    }
    return false;
  }

  //valid Exam Date
  public isValidDate(examDate:Date,trialDate:Date){
     let currentDate=new Date();
     let eDate=new Date(examDate);
     let tDate=new Date(trialDate);
   
     if(currentDate.getTime() < eDate.getTime()){
       if(eDate.getTime() < tDate.getTime()){
         return true;
       }
     }
     return false;
  }

  //Telephone number Validation
  isValidTelNumber(tel){
    if(tel.length == 10){
      this.regExp = new RegExp('\\d{10,10}');
      this.test = this.regExp.test(tel);
      if(this.test){
        return true;
      }
    }
    return false;
  }

}
