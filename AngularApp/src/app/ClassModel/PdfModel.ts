import { AdminStaffModel } from './AdminStaffModel';

export class PdfModel{
    constructor(  public pdfId:Number,
      public resource:String,
      public description:String,
      public tags:String,
      public adminStaffId:AdminStaffModel,
      public addedDate:Date
      ) 
    {}
} 