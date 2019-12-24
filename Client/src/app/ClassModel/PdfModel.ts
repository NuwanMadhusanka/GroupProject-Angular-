import { AdminStaffModel } from './AdminStaffModel';

export class PdfModel{
    constructor(  
      public pdfId:Number,
      public resource:String,
      public description:String,
      public title:String,
      public adminStaffId:AdminStaffModel,
      public addedDate:Date
      ) 
    {}
} 