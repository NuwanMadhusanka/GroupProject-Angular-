import { StaffModel } from './StaffModel';

export class ComplainModel{
    constructor(
    public complainId:Number,
    public title:String,
    public complain:String,
    public view:number,
    public date:Date,  
    public reply:String,  
    public staffId:StaffModel
  ){}
  }