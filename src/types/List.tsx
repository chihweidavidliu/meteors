import { IQuestion } from "./Question";

export interface IList {
  id: string;
  name: string;
  questions: IQuestion[];
}
