import { AdminModel } from './AdminModel';

export class LeaveSettingModel{
    constructor(
        public leaveSettingId:Number,
        public updateDate:Date,
        public applyMonth:Number,
        public numLeave:Number,
        public adminId:AdminModel
    ){}
}