import { StudentModel } from './StudentModel';

export class FeedBackModel{
    constructor(
    public feedbackid:Number,
    public feedback:String,
    public studentId:StudentModel
  ){}
  }