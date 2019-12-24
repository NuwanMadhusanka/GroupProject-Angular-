import { VehicleModel } from './VehicleModel';

export class InsurancePaymentModel{
    constructor(
      public insurancePaymentId:Number,
      public date:Date,
      public amount:Number,
      public startDate :Date,
      public endDate :Date,
      public year :Number,
      public vehicleId :VehicleModel
    ){}
}