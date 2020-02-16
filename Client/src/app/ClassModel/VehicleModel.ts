import { InstructorModel } from './InstructorModel';
import { VehicleCategoryModel } from './MapObject/VehicleCategory';

export class VehicleModel{
    constructor(
        public vehicleId:Number,
        public brand:String,
        public model:String,
        public fuelType:Number,
        public transmission:Number,
        public documentLic:String,
        public instructorId:InstructorModel,
        public status:Number,
        public number:String,
        public insurancePeriod:Number,
        public vehicleCategoryId:VehicleCategoryModel
    ){}
}