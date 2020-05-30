export interface IQuestionStats {
  correctlyAnswered: number;
  appearances: number;
}

export interface IQuestion {
  id: string;
  question: string;
  answers: string[];
  stats: IQuestionStats;
}
