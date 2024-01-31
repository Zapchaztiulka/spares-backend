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

  if (order && deliveryMethodId) {
    const { isByCourier } = patterns.deliveryMethods.find(
      method => method.deliveryMethodId === deliveryMethodId,
    );

    if ((isByCourier && !deliveryCity) || (isByCourier && !deliveryAddress)) {
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

  if (
    order &&
    !deliveryMethodId &&
    (deliveryRegion === '' ||
      deliveryDistrict === '' ||
      deliveryCity === '' ||
      deliveryAddress === '' ||
      deliveryOffice === '' ||
      deliveryRate === '' ||
      deliveryRegion ||
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

  if (order && userType && legalEntityData === undefined) {
    throw HttpError(
      400,
      'when updating the "userType" field, the "legalEntityData" field must be updated too',
    );
  }

  const isLegalEntityData = !!(legalEntityData || legalEntityData === null);

  if (order && userType === undefined && isLegalEntityData) {
    throw HttpError(
      400,
      'when updating the "legalEntityData" field, the "userType" field must be updated too',
    );
  }

  if (order && userType && isLegalEntityData) {
    if (userType === patterns.userTypes[0] && legalEntityData !== null) {
      throw HttpError(
        400,
        `when "userType" field is ${userType}, the "legalEntityData" field must be "null"`,
      );
    }

    if (userType !== patterns.userTypes[0] && legalEntityData === null) {
      throw HttpError(
        400,
        `when "userType" field is ${userType}, the "legalEntityData" fields must be filled`,
      );
    }
  }
};
