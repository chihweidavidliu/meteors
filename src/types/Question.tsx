export interface IQuestionStats {
  correctlyAnswered: number;
  appearances: number;
}

export interface IQuestion {
  id: string;
  term: string;
  definition: string;
  stats: IQuestionStats;
}
