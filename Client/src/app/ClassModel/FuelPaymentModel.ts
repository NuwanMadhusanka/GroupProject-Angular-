export class FuelPaymentModel{
    constructor(
        public fuelPaymentId:Number,
        public month:Number,
        public year:Number,
        public date:Date,
        public amount:number,
        public adminStaffId:Number
    ){}
}