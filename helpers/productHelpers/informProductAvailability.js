const {
  userRequest: { UserRequest },
} = require('../../models');
const { sendEmailProductIsAvailable } = require('../sendEmail');

module.exports = async ({ productId, productName, vendorCode, price }) => {
  const requests = await UserRequest.find({ productId });

  if (requests.length === 0) return;

  for (const request of requests) {
    const { email, _id } = request;
    sendEmailProductIsAvailable({
      productId,
      email,
      productName,
      vendorCode,
      price,
    });

    await UserRequest.findByIdAndDelete(_id);
  }
};
