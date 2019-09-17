import { TimeSlotModel } from '../TimeSlotModel';

export class PackageAnalysisData{
    constructor(
        public day:String,
        public timeSlot:TimeSlotModel[],
        public student:Number[],
        public stuPercentage:Number[]
    ){}
}