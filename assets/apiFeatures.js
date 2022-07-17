const { removeSpecialFieldsFromQuery } = require('./helperFunctions');

/**
 * Organize the filtering, pagination and sorting in a single class
 */
class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  //   Filter the query by certain fields (name, servings, cookingTime, etc.)
  filter() {
    const query = { ...this.queryObj };
    removeSpecialFieldsFromQuery(query);

    this.query = this.query.find(query);

    return this;
  }

  //   Sort the current query
  sort() {
    const sortQuery = this.queryObj.sort;

    if (sortQuery) {
      // This operation must be done because Mongoose only accepts a format "name category", not "name,category"
      const sortBy = sortQuery.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  //   Limit fields sent to the client (on request by the client-side code)
  limitFields() {
    const fieldsQuery = this.queryObj?.fields;

    if (fieldsQuery) {
      const fields = fieldsQuery.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // In order not to send useless data to the client ('__v')
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
