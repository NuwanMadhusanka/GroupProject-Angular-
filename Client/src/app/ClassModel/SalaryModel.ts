import { StaffModel } from './StaffModel';

export class SalaryModel{
    constructor(
        public salaryId:Number,
        public month:Number,
        public year:Number,
        public totalPayment:number,
        public payed:number,
        public nopay:number,
        public complete:Number,
        public date:Date,
        public staffId:StaffModel
    ){}
}