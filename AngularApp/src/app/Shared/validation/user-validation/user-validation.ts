
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

  //valid exam date
  public isValidExamDate(examDate){
    let currentDate = new Date();
    if(examDate>currentDate){
      return true;
    }
    return false;
  }

  //valid trial date
  public isValidTrialDate(trialDate){
    let currentDate = new Date();
    if(trialDate>currentDate){
      return true;
    }
    return false;
  }

  //valid Exam Date
  public isValidDate(examDate:Date,trialDate:Date){
   
     let currentDate=new Date();
     let currentYear=currentDate.getFullYear();
     let currentMonth=currentDate.getMonth()+1;
     let currentDay=currentDate.getDate();

    
     let eDate=new Date(examDate);
     let examYear=eDate.getFullYear();
     let examMonth=eDate.getMonth();
     let examDay=eDate.getDate();

     let tDate=new Date(trialDate);
     let trialYear=tDate.getFullYear();
     let trialMonth=tDate.getMonth();
     let trialDay=tDate.getDate();

     if(currentDate>eDate){

     }
   
     return true;
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

  //valid NIC Number
  isValidNicNumber(nic){
    if(nic.length == 10){
      this.regExp = new RegExp('\\d{9,9}[v,V]');
      this.test = this.regExp.test(nic);
      if(this.test){
        return true;
      }
    }
    return false;
  }

}
