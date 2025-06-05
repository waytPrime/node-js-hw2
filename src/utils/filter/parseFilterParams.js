import { BOOLEAN_ARRAY, CONTACT_TYPE_LIST } from '../../constants/index.js';
import { parseString } from '../parseString.js';

export const parseFilterParams = ({ isFavorite, contactType }) => {
  const parseIsFavoriteFilter = parseString(isFavorite, BOOLEAN_ARRAY);
  const parseContactTypeFilter = parseString(contactType, CONTACT_TYPE_LIST);

  return {
    isFavorite: parseIsFavoriteFilter,
    contactType: parseContactTypeFilter,
  };
};
