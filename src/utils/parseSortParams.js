import { SORT_LIST } from "../constants/index.js";
import { listSortDb } from "../db/models/contactsModel.js";
import { parseString } from "./parseString.js";

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parseSortBy = parseString(sortBy, listSortDb);
  const parseSortOrder = parseString(sortOrder, SORT_LIST);

  return {
    sortBy: parseSortBy,
    sortOrder: parseSortOrder,
  };
};
