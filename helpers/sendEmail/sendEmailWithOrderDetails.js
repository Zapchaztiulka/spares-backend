const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { formatDate } = require('../../helpers');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async orderDetails => {
  const {
    _id,
    username = '',
    userSurname = '',
    phone,
    email,
    products,
    createdAt,
  } = orderDetails;

  const totalAmount = orderDetails.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const orderNumber = _id.toString().slice(-6);
  const orderDate = formatDate(createdAt);

  const newEmail = {
    to: email,
    subject: `Запчастюлька - деталі замовлення №${orderNumber}`,
    html: `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 10px;
            background-color: #f4f4f4;
          }
          
          .main-title {
            font-size: 28px;
          }

          .text {
            font-size: 16px;
          }

          .second-title {
            font-size: 20px;
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
          }

          .main {
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
          }

          .main table {
            width: 100%;
            border-collapse: collapse;
          }

          .main th, .main td {
            padding: 6px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }

          .main th {
            background-color: #f5f5f5;
          }

          .footer {
            background-color: #fff;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
          }

          .footer .logo img {
            max-width: 100px;
            height: auto;
          }

          @media (max-width: 600px) {
            .main-title {
              font-size: 20px;
            }

            .text {
              font-size: 14px;
            }

            .second-title {
              font-size: 14px;
            }

            .main {
              padding: 10px;
            }

            .main th, .main td {
              padding: 4px;
              font-size: 12px;
            }

            .footer {
              padding: 8px;
            }
          }

          @media (min-width: 601px) and (max-width: 1200px) {
            .main th, .main td {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="main-title">Дякуємо за замовлення!</h1>
          <p class="text"> <b>Вітаємо ${username}!</b> Ваше замовлення прийнято. Очікуйте дзвінка нашого менеджера.</p>
        </div>
        <div class="main">
          <h2 class="second-title">Замовлення №${orderNumber} (${orderDate})</h2>
          <table>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Кількість</th>
                <th>Ціна одиниці</th>
                <th>Загальна сума</th>
              </tr>
            </thead>
            <tbody>
              ${products
                .map(
                  ({ name, quantity, price }) => `
                <tr>
                  <td>${name}</td>
                  <td>${quantity}</td>
                  <td>${price}</td>
                  <td>${price * quantity}</td>
                </tr>
              `,
                )
                .join('')}
              <tr>
                <td colspan="3">Загалом</td>
                <td>${totalAmount}</td>
              </tr>
              <tr>
                <td colspan="2">Доставка</td>
                <td>Нова пошта</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="footer">
          <p>Покупець: ${username} ${userSurname}</p>
          <p>Телефон: ${phone}</p>
          <p>Email: ${email}</p>
          <p>Адреса доставки: Якась адреса</p>
          <div class="logo">
            <img src="https://i.ibb.co/0r0Dqsf/logo.png" alt="Spare parts store" />
            <p>Запчастюлька</p>
          </div>
        </div>
      </body>
    </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
