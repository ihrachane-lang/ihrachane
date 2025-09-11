import dbConnect from "@/lib/mongodb";
/**
 * Pagination Helper with Populate, Search & Filter
 * @param {Object} model - Mongoose model
 * @param {Object} query - Express/Next req.query object
 * @param {Array} searchFields - যেসব ফিল্ডে সার্চ হবে
 * @param {Array|String} populateFields - যেসব ফিল্ড populate হবে
 * @param {Array} filterFields - যেসব ফিল্ড filter করা যাবে
 */
export const getPaginatedData = async (
  model,
  query,
  searchFields = [],
  populateFields = [],
  filterFields = []
) => {
  try {
    await dbConnect(); // Ensure DB connection

    // Pagination & Sorting
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const sortField = query.sortField || "createdAt";
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;
    const search = query.search || "";

    // Search condition
    let searchCondition = {};
    if (search && searchFields.length > 0) {
      searchCondition = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      };
    }

    // ✅ Filter condition
    let filterCondition = {};
    if (filterFields.length > 0) {
      filterFields.forEach((field) => {
        if (query[field]) {
          // যদি field এর value array হয় → $in দিয়ে filter
          if (Array.isArray(query[field])) {
            filterCondition[field] = { $in: query[field] };
          } else {
            filterCondition[field] = query[field];
          }
        }
      });
    }

    // ✅ Final condition (search + filter)
    const finalCondition =
      Object.keys(searchCondition).length > 0
        ? { $and: [searchCondition, filterCondition] }
        : filterCondition;

    // Total count
    const totalDocuments = await model.countDocuments(finalCondition);

    // Query তৈরি করি
    let dbQuery = model
      .find(finalCondition)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    // Populate handle করি (এক বা একাধিক field)
    if (populateFields && populateFields.length > 0) {
      if (Array.isArray(populateFields)) {
        populateFields.forEach((field) => {
          dbQuery = dbQuery.populate(field);
        });
      } else {
        dbQuery = dbQuery.populate(populateFields);
      }
    }

    // Data execute
    const data = await dbQuery;

    return {
      success: true,
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
        limit,
      },
      data,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
