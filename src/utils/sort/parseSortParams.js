import { SORT_ORDER_LIST } from '../../constants/index.js';
import { SORT_BY_LIST } from '../../db/models/contactsModel.js';
import { parseString } from '../parseString.js';

export const parseSortParams = ({ sotrBy, sortOrder }) => {
  const parseSortBy = parseString(sotrBy, SORT_BY_LIST);
  const parseSortOrder = parseString(sortOrder, SORT_ORDER_LIST);

  return {
    sotrBy: parseSortBy,
    sortOrder: parseSortOrder,
  };
};
