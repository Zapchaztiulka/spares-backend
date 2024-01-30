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
    if (
      (userType !== undefined &&
        userType === patterns.userTypes[0] &&
        legalEntityData !== undefined &&
        legalEntityData !== null) ||
      (legalEntityData === undefined && order.legalEntityData !== null)
    ) {
      throw HttpError(
        400,
        `"userType" can NOT be ${userType} because "legalEntityData" is filled. Change "userType" or the value assigned to "legalEntityData" is "null"`,
      );
    }

    if (
      legalEntityData !== undefined &&
      legalEntityData !== null &&
      ((userType !== undefined && userType === patterns.userTypes[0]) ||
        (userType === undefined && order.userType === patterns.userTypes[0]))
    ) {
      throw HttpError(
        400,
        `"legalEntityData" can NOT be filled because "userType" is ${patterns.userTypes[0]}. The value assigned to "legalEntityData" is "null" or change "userType"`,
      );
    }

    if (
      (userType !== undefined &&
        userType !== patterns.userTypes[0] &&
        legalEntityData !== undefined &&
        legalEntityData === null) ||
      (legalEntityData === undefined && order.legalEntityData === null)
    ) {
      throw HttpError(
        400,
        `"userType" can NOT be ${userType} because "legalEntityData" is null. Change "userType" or fill "legalEntityData" fields`,
      );
    }

    if (
      legalEntityData !== undefined &&
      legalEntityData === null &&
      ((userType !== undefined && userType !== patterns.userTypes[0]) ||
        (userType === undefined && order.userType !== patterns.userTypes[0]))
    ) {
      throw HttpError(
        400,
        `"legalEntityData" can NOT be "null" because "userType" is NOT ${patterns.userTypes[0]}. Fill "legalEntityData" fields or change "userType"`,
      );
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
