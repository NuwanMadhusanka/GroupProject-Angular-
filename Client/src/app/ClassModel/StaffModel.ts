import { UserModel } from './UserModel';

export class StaffModel{
    constructor(
    public staffId:Number,
    public userId:UserModel
  ){}
  }