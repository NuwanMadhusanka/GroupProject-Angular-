import { AdminStaffModel } from './AdminStaffModel';
import { StudentModel } from './StudentModel';
import { PaperModel } from './PaperModel';

export class StudentPaperModel {
  constructor(
    public studentPaperId: Number,
    public student: StudentModel,
    public paperId: PaperModel,
    public date: Date,
    public marks:Number
    //public answers:number[][]
    
 
  )
  { }
} 