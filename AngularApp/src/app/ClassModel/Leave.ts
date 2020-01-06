import { StaffModel } from './StaffModel';

export class LeaveModel{
    constructor(
    public leaveid:number,
    public reason:String,       
    public date:Date,
    public staffId:StaffModel,
  ){}
}
