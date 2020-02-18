import { VehicleModel } from '../VehicleModel';

export class VehicleMaintainanceModel{
    constructor(
        public maintainanceId:Number,
        public type:String,
        public description:String,
        public amount:Number,
        public vehicleId:VehicleModel
    ){}
}