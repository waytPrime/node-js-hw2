export const calculatePaginationData = ({ length, page, perPage }) => {
  const totalPage = Math.ceil(length / perPage);
  const hasNextPage = totalPage < page;
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalPage,
    hasNextPage,
    hasPreviousPage,
    totalItem: length,
  };
};
