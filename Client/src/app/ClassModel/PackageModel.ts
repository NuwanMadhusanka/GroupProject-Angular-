import { VehicleCategoryModel } from './MapObject/VehicleCategory';

export class PackageModel{
    constructor(
    public packageId:Number,
    public title:String,
    public description:String,
    public packageImage:Number,
    public price:number,
    public status:Number,
    public manualLes:Number,
    public autoLes:Number,
    public basicPayment:Number,
    public vehicleCategoryId:VehicleCategoryModel
  ){}
  }