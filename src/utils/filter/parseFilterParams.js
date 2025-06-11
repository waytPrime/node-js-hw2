import { BOOLEAN_ARRAY, CONTACT_TYPE_LIST } from '../../constants/index.js';
import { parseStringFilterParams } from './parseStringFilterParams.js';

export const parseFilterParams = ({ isFavorite, contactType }) => {
  const parseIsFavoriteFilter = parseStringFilterParams(
    isFavorite,
    BOOLEAN_ARRAY,
  );
  const parseContactTypeFilter = parseStringFilterParams(
    contactType,
    CONTACT_TYPE_LIST,
  );

  return {
    isFavorite: parseIsFavoriteFilter,
    contactType: parseContactTypeFilter,
  };
};
