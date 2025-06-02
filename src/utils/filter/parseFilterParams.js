import { CONTACT_TYPE } from "../../constants/index.js";
import { parseString } from "../parseString.js";
import { parseBooleanParams } from "./parseBoleanParams.js";

// const parseContactType = (contactType) => {
//   const parseStr = parseString(contactType);

//   return CONTACT_TYPE.includes(parseStr) ? parseStr : CONTACT_TYPE[0];
// };

export const parseFilterParams = ({ isFavorite, contactType }) => {
  const isFavoriteFilters = parseBooleanParams(isFavorite);
  const contactTypeParseStr = parseString(contactType, CONTACT_TYPE);
  console.log(contactTypeParseStr);

  // const contactTypeParseFilter = parseContactType(contactTypeParseStr);

  return { isFavorite: isFavoriteFilters, contactType: contactTypeParseStr };
};
