import { AdminStaffModel } from './AdminStaffModel';

export class PaperModel {
  constructor(public paperId: Number,
    public title: String,
    public no_of_questions: Number,
    public no_of_answers: Number,
    public adminStaffId: AdminStaffModel,
    public addedDate: Date
 
  )
  { }
} 