import shortid from "shortid";

export const createBlankQuestion = () => ({
  id: shortid.generate(),
  term: "",
  definition: "",
  stats: { appearances: 0, correctlyAnswered: 0 },
});
