const { HttpError, patterns } = require('..');

module.exports = async (additionalData, order) => {
  const {
    legalEntityData,
    userType,
    deliveryMethodId,
    deliveryRegion,
    deliveryDistrict,
    deliveryCity,
    deliveryAddress,
    deliveryOffice,
    deliveryRate,
  } = additionalData;

  if (!order) {
    if (userType && userType !== patterns.userTypes[0] && !legalEntityData) {
      throw HttpError(400, 'Legal entity data are required');
    }

    if (userType === patterns.userTypes[0] && legalEntityData) {
      throw HttpError(400, 'Legal entity data is prohibited for individuals');
    }

    if (deliveryMethodId) {
      const { isByCourier } = patterns.deliveryMethods.find(
        method => method.deliveryMethodId === deliveryMethodId,
      );

      if (isByCourier && (!deliveryCity || !deliveryAddress)) {
        throw HttpError(
          400,
          'deliveryCity and deliveryAddress are required for delivery by courier',
        );
      }

      if (!isByCourier && !deliveryOffice) {
        throw HttpError(
          400,
          'deliveryOffice are required when delivering WITHOUT a courier',
        );
      }
    }
  }

  if (order) {
    if (legalEntityData !== 'undefined') {
      if (
        (userType &&
          userType === patterns.userTypes[0] &&
          legalEntityData !== null) ||
        (!userType === 'undefined' && order.userType === patterns.userTypes[0])
      ) {
        throw HttpError(400, 'Legal entity data is prohibited for individuals');
      }

      if (
        !userType === 'undefined' &&
        order.userType === patterns.userTypes[0] &&
        legalEntityData !== null
      ) {
        throw HttpError(400, 'Legal entity data is prohibited for individuals');
      }

      if (
        userType &&
        userType !== patterns.userTypes[0] &&
        legalEntityData === null
      ) {
        throw HttpError(
          400,
          'Legal entity data for company or entrepreneur can not be "null"',
        );
      }
    }

    if (userType && legalEntityData === 'undefined') {
      if (userType !== patterns.userTypes[0] && !order.legalEntityData) {
        throw HttpError(400, 'Legal entity data are required');
      }

      if (userType === patterns.userTypes[0] && order.legalEntityData) {
        throw HttpError(
          400,
          'Legal entity data exists in database and is prohibited for individuals. Change legalEntityData to "null"',
        );
      }
    }

    if (deliveryMethodId) {
      const { isByCourier } = patterns.deliveryMethods.find(
        method => method.deliveryMethodId === deliveryMethodId,
      );

      if (
        isByCourier &&
        (!deliveryCity ||
          !deliveryAddress ||
          !order.deliveryCity ||
          !order.deliveryAddress)
      ) {
        throw HttpError(
          400,
          'deliveryCity and deliveryAddress are required for delivery by courier',
        );
      }

      if (!isByCourier && (!deliveryOffice || order.deliveryOffice)) {
        throw HttpError(
          400,
          'deliveryOffice are required when delivering WITHOUT a courier',
        );
      }
    }

    if (
      !deliveryMethodId &&
      (deliveryRegion ||
        deliveryDistrict ||
        deliveryCity ||
        deliveryAddress ||
        deliveryOffice ||
        deliveryRate)
    ) {
      throw HttpError(
        400,
        'any delivery fields MUST NOT be without a deliveryMethodId',
      );
    }
  }
};
