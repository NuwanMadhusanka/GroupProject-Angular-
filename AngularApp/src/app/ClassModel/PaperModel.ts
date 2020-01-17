import { AdminStaffModel } from './AdminStaffModel';

export class PaperModel {
  constructor(public paperId: Number,
    public title: String,
    public no_of_questions: number,
    public no_of_answers: number,
    public adminStaffId: AdminStaffModel,
    public addedDate: Date
 
  )
  { }
} 