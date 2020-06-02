import { IList } from "../types/List";

export const updateSavedLists = (updatedLists: IList[]) => {
  window.localStorage.setItem("vocabLists", JSON.stringify(updatedLists));
};
