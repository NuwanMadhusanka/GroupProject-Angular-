import { Time } from '@angular/common';
import { StaffModel } from '../StaffModel';

export class AttendanceModel{
    constructor(
        public attendanceId:Number,
        public date:Date,
        public comeTime:Time,
        public leaveTime:Time,
        public staffId:StaffModel
    ){}
}