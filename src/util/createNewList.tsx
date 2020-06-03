import shortid from "shortid";
import { IList } from "../types/List";
import { createBlankQuestion } from "./createBlankQuestion";

export const createNewList = (): IList => ({
  id: shortid.generate(),
  name: "",
  questions: [createBlankQuestion()],
});
