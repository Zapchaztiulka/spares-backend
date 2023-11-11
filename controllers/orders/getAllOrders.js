const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  let { query = '', page = 1, limit = 10 } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  query = query.trim();
  query = query.toLowerCase();

  let orders = [];
  let result = [];

  if (query) {
    const response = await Order.aggregate([
      {
        $addFields: {
          totalPriceStr: { $toString: '$totalPrice' },
          orderId: { $toString: '$_id' },
        },
      },
    ]);

    result = response.filter(el => {
      return (
        el.phone.includes(query) ||
        el.orderId.slice(18, 24).includes(query) ||
        el.totalPriceStr.includes(query)
      );
    });

    orders.push(...(result ?? []));
  } else {
    orders = await Order.find();
  }

  let paginatedOrders = [];

  if (skip >= 0) {
    paginatedOrders = orders.slice(skip, skip + parseInt(limit, 10));
  } else {
    paginatedOrders = orders;
  }

  res
    .status(200)
    .json({ orders: paginatedOrders, totalCount: orders.length || 0 });
};
