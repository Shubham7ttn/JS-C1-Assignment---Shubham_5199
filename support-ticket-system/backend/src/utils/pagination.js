export const buildPagination = ({ page, limit, total }) => {
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(total / safeLimit) || 1;

  return {
    page,
    limit: safeLimit,
    total,
    totalPages,
  };
};

export const parsePagination = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
