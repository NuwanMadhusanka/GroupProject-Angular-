import { AdminStaffModel } from './AdminStaffModel';

export class VideoModel{
    constructor(
    public videoId:number,
    public url:String,
    public description:String,
    public adminStaffId:AdminStaffModel, 
    public addedDate:Date
  ){}
}
