import { AdminStaffModel } from './AdminStaffModel';

export class VideoModel{
    constructor(
    public videoId:number,
    public title:String,
    public description:String,
    public url:String,
    public adminStaffId:AdminStaffModel, 
    public addedDate:Date
  ){}
}
