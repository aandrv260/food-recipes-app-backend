exports.removeSpecialFieldsFromQuery = query => {
  const excludedFields = ['page', 'sort', 'limit', 'fields'];

  excludedFields.forEach(field => {
    delete query[field];
  });
};
