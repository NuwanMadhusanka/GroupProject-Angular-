import { AdminModel } from './AdminModel';

export class YearUpdateModel{
    constructor(
        public year_id:Number,
        public systemUpdateStatus:Number,
        public message:String,
        public updateYear:String,
        public adminId:AdminModel
    ){}
}