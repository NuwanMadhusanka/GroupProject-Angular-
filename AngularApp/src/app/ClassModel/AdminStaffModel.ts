import { StaffModel } from './StaffModel';


export class AdminStaffModel{
    constructor(
      public adminStaffId:Number,
      public qualification:String,
      public type:Number,
      public staff_id:StaffModel,
    ){}
}