import { AdminStaffModel } from './AdminStaffModel';

export class PaperModel {
  constructor(public paperId: Number,
    public title: String,
    public adminStaffId: AdminStaffModel,
    public addedDate: Date,
    public noOfQuestions: Number,
    public noOfAnswers: Number
  )
  { }
} 