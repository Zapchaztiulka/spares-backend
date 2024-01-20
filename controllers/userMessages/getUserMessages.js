const {
  userMessage: { UserMessage },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const {
    page,
    limit,
    type = '',
    status = '',
    sortType = '',
    sortBy = '',
  } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  const formattedType = type.trim();
  const formattedStatus = status.trim();
  const formattedSortType = sortType.trim();
  const formattedSortBy = sortBy.trim();

  if (formattedType && !patterns.typeUserApplication.includes(formattedType)) {
    throw HttpError(
      400,
      `Invalid type of user message. Must be one of following: ${patterns.typeUserApplication}`,
    );
  }

  if (
    formattedStatus &&
    !patterns.statusUserApplication.includes(formattedStatus)
  ) {
    throw HttpError(
      400,
      `Invalid status of user message. Must be one of following: ${patterns.statusUserApplication}`,
    );
  }

  if (
    (formattedSortType && !formattedSortBy) ||
    (formattedSortBy && !formattedSortType)
  ) {
    throw HttpError(
      400,
      'Bad query: sort parameters. Both parameters must be specified',
    );
  }

  if (formattedSortType && !patterns.sortTypes.includes(formattedSortType)) {
    throw HttpError(
      400,
      `Invalid "sortType" parameter. Must be one of following: ${patterns.sortTypes}`,
    );
  }

  if (
    formattedSortBy &&
    !patterns.sortUserApplicationBy.includes(formattedSortBy)
  ) {
    throw HttpError(
      400,
      `Invalid "sortBy" parameter. Must be one of following: ${patterns.sortUserApplicationBy}`,
    );
  }

  const filters = {};
  if (formattedType !== '') {
    filters.type = formattedType;
  }
  if (formattedStatus !== '') {
    filters.status = formattedStatus;
  }

  const userMessages = await UserMessage.find(filters);

  // Sorting logic based on sortType and sortBy
  if (formattedSortType && formattedSortBy) {
    const sortOrder = formattedSortType === 'smallLarge' ? 1 : -1;

    userMessages.sort((a, b) => {
      let valueA, valueB;

      switch (formattedSortBy) {
        case 'type':
          valueA = a.type.toLowerCase();
          valueB = b.type.toLowerCase();
          break;
        case 'status':
          valueA = a.status.toLowerCase();
          valueB = b.status.toLowerCase();
          break;
        case 'createdAt':
          valueA = a.createdAt;
          valueB = b.createdAt;
          break;
        default:
          valueA = 0;
          valueB = 0;
      }

      if (valueA < valueB) {
        return -1 * sortOrder;
      }
      if (valueA > valueB) {
        return 1 * sortOrder;
      }
      return 0;
    });
  }

  // create response with pagination
  let paginatedUserMessages = [];

  if (skip >= 0) {
    paginatedUserMessages = userMessages.slice(
      skip,
      skip + parseInt(limit, 10),
    );
  } else {
    paginatedUserMessages = userMessages;
  }

  res.status(200).json({
    userMessages: paginatedUserMessages,
    totalCount: userMessages.length || 0,
  });
};
