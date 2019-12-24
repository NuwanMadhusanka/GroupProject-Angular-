import { TimeSlotModel } from '../TimeSlotModel';

export class LessonDayFeedbackChartDataMap{
    constructor(
        public totalRequest:Number[],
        public handleRequest:Number[],
        public extraRequest:Number[],
        public timeSlot:TimeSlotModel
    ){}
}