import { InstructorModel } from './InstructorModel';
import { VehicleCategoryModel } from './MapObject/VehicleCategory';

export class VehicleModel{
  subscribe: any;
    constructor(
        public vehicleId:Number,
        public brand:String,
        public model:String,
        public fuel_type: Number,
        public transmission:Number,
        public document_lic:String,
        // public instructorId:InstructorModel,
        public status:Number,
        public number:String,
        // public insurancePeriod:Date,
        public vehicle_category_id:VehicleCategoryModel
        

    ){}
}