import { UserModel } from './UserModel';

export class StudentModel{
    constructor(
    public studentId:Number,
    public examDate:Date,
    public trialDate:Date,
    public userId:UserModel
  ){}
  }