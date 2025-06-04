import { parseNumber } from './parseNumber.js';

export const parsePaginationParams = ({ page, perPage }) => {
  const parsePage = parseNumber(page);
  const parsePerPage = parseNumber(perPage);
  return { page: parsePage, perPage: parsePerPage };
};
