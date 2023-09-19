const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { formatDate, formatNumber, patterns } = require('../../helpers');

const { SENDGRID_API_KEY } = process.env;
const {
  companyData: { firstPhone, secondPhone, thirdPhone, addressCompany },
} = patterns;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async orderDetails => {
  const {
    _id,
    username = '',
    userSurname = '',
    phone,
    email,
    products,
    delivery = 'Самовивіз',
    costDelivery = 0,
    addressDelivery = 'Самовивіз',
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
            background-color: #f4f4f4;
            font-weight: 400;
          }
          
          h1, h2, h3, h4, h5, h6, p, span, div, table, tbody, thead, td, tr, th {
            margin: 0;
            padding: 0;
          }

          img {
            display: block;
            max-width: 100%;
            height: auto;
          }

          th, td {
            padding: 6px;
            border-bottom: 1px solid #ddd;
          }

          .title {
            font-weight: 500;
            font-size: 24px;
            line-height: 1.2;
          }

          .text {
            font-weight: 500;
            font-size: 16px;
            line-height: 1.4;
            color: #1C1F23;
          }

          .footer {
            font-size: 12px;
            line-height: 1.4;
            color: #41464C;
            background-color: #F9F9F9;
            padding: 12px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
          }

          @media (max-width: 600px) {
            th, td {
              padding: 4px;
              font-size: 12px;
            }

            .title {
              font-size: 18px;
              line-height: 1.3;
            }

            .text {
              font-size: 12px;
            }

            .title-order {
              font-size: 14px;
            }

            .footer {
              font-size: 10px;
              padding: 8px;
            }
          }

          @media (min-width: 601px) and (max-width: 1200px) {
            th, td {
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div style="margin-bottom: 24px;">
          <div style="padding: 20px; border-radius: 8px; background-color: #FFFFFF; display: flex; align-items: center; width: 210px;">
            <a href="https://zapchaztiulka-catalog-frontend.vercel.app">
              <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
            <a/>
          </div>
          <h1 class="title" style="text-align: left; color: #1C1F23; margin-top: 20px; margin-bottom: 12px;">Дякуємо за замовлення!</h1>
          <p class="text" style="text-align: left;"> <b>Вітаємо ${username}!</b> Ваше замовлення прийнято. Очікуйте дзвінка нашого менеджера.</p>
        </div>
        <div style="margin-bottom: 24px;">
          <h2 class="title title-order" style="text-align: left; color: #1C1F23; margin-bottom: 4px;">Замовлення №${orderNumber} (${orderDate})</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="font-size: 14px; line-height: 1.4; color: #6B7075; background-color: #f5f5f5;">
                <th>Товар</th>
                <th style="text-align: center;">Кількість</th>
                <th style="text-align: center;">Ціна одиниці</th>
                <th style="text-align: center;">Загальна сума</th>
              </tr>
            </thead>
            <tbody>
              ${products
                .map(
                  ({ name, quantity, price, units }) => `
                <tr class="text">
                  <td style="text-align: left;">${name}</td>
                  <td style="font-weight: 400; text-align: center; color: #6B7075;">${formatNumber(
                    quantity,
                  )} ${units}</td>
                  <td style="font-weight: 400; text-align: center;">${formatNumber(
                    price,
                  )}  грн.</td>
                  <td style="font-weight: 400; text-align: center;">${formatNumber(
                    price * quantity,
                  )}  грн.</td>
                </tr>
              `,
                )
                .join('')}
              <tr class="text">
                <td colspan="3" style="text-align: left;">Сума</td>
                <td style="text-align: center;">${formatNumber(
                  totalAmount,
                )}  грн.</td>
              </tr>
              <tr class="text">
                <td colspan="2">Доставка</td>
                <td style="color: #6B7075; text-align: center;">${delivery}</td>
                <td style="text-align: center;">${costDelivery} грн.</td>
              </tr>
              <tr class="title" style="color: #1D4ED8;">
                <td colspan="3" style="text-align: left;">Загалом</td>
                <td style="text-align: center;">${formatNumber(
                  totalAmount + costDelivery,
                )}  грн.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text" style="padding-top: 24px; padding-bottom: 24px">
          <p style="font-size: 20px; line-height: 1.2; margin-bottom: 16px;">Дані покупця:</p>
          <p style="margin-bottom: 12px;">${username} ${userSurname}</p>
          <p style="margin-bottom: 12px;">Телефон: ${phone}</p>
          <p style="margin-bottom: 12px;">Email: ${email}</p>
          <p>Адреса доставки: ${addressDelivery}</p>
        </div>
        <h3>
          <a href="https://zapchaztiulka-catalog-frontend.vercel.app"> Повернутися в магазин >>> <a/>
        </h3>
        <div class="footer">
          <p style="margin-right: 12px;">${firstPhone}</p>
          <p style="margin-right: 12px;">${secondPhone}</p>
          <p style="margin-right: 12px;">${thirdPhone}</p>
          <p>${addressCompany}</p>
        </div>
      </body>
    </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
