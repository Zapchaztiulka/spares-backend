// const {
//   order: { Order },
// } = require('../../models');

// module.exports = async (_, res) => {
//   const orders = await Order.find();

//   res.json({ orders, totalCount: orders.length });
// };

const {
  order: { Order },
} = require('../../models');

module.exports = async (req, res) => {
  let { query = '', limit } = req.query;

  limit = limit || 10;

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
    ]).limit(limit);
    result = response.filter(el => {
      return (
        el.phone.includes(query) ||
        el.orderId.includes(query) ||
        el.totalPriceStr.includes(query)
      );
    });

    orders.push(...(result ?? []));
  } else {
    orders = await Order.find().limit(limit);
  }

  res.json({ orders, totalCount: orders.length });
};
