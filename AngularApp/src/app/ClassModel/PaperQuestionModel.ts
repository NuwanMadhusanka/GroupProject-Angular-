import { PaperModel } from './PaperModel';

export class PaperQuestionModel {
  constructor(public questionId: Number,
    public paperId:PaperModel,
    public question_number: Number,
    public answer:String
  )
  { }
} 