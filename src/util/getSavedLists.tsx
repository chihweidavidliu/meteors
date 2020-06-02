import { IList } from "../types/List";

export const getSavedLists = () => {
  const existingListsRaw = window.localStorage.getItem("vocabLists");
  const existingLists = existingListsRaw ? JSON.parse(existingListsRaw) : [];
  return existingLists as IList[];
};
