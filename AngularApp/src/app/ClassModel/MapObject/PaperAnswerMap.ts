import { PaperModel } from '../PaperModel';
export class PaperAnswerMap{
    constructor(
        public paper:PaperModel,
        public answers:String
    ){}
}