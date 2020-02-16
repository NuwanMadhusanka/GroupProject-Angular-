import { AdminStaffModel } from './AdminStaffModel';

export class PdfModel{
    constructor(  
      public pdfId: Number,
      public title: String,
      public description: String,
      public adminStaffId: AdminStaffModel,
      public addedDate: Date
      ) 
    {}
} 