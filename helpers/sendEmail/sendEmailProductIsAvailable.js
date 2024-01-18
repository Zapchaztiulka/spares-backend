const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, GATALOG_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async ({
  productId,
  email,
  productName,
  vendorCode,
  price,
}) => {
  const newEmail = {
    to: email,
    subject: `Запчастюлька - ТОВАР з артикулом ${vendorCode} доступний для замовлення!`,
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
          img {
            display: block;
            max-width: 100%;
            height: auto;
          }
          .text {
            font-weight: 500;
            font-size: 20px;
            line-height: 1.4;
            color: #1C1F23;
          }
          .buy-button-wrapper,
          .return-button-wrapper {
            margin-top: 12px;
            text-align: left;
            font-weight: 500;
            font-size: 16px;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .buy-button-wrapper {
            background-color: #D92D20;
            margin-right: 10px;
          }
          .return-button-wrapper {
            background-color: #1570EF;
          }

          .buy-button-wrapper:hover,
          .buy-button-wrapper:focus {
            background-color: #912018;
          }
          .return-button-wrapper:hover,
          .return-button-wrapper:focus {
            background-color: #1849A9;
          }
        </style>
      </head>
      <body>
        <div style="margin-bottom: 24px;">
          <div style="padding: 20px; padding-left: 4px; border-radius: 8px; background-color: #FFFFFF; display: flex; align-items: center; width: 210px;">
            <a href="${GATALOG_URL}">
              <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
            <a/>
          </div>
          <p class="text" style="text-align: left;"> Раді повідомити, що товар "${productName}" доступний для замовлення. Поспішайте - в наявності обмежена кількість. Ціна - ${price} грн. </p>
        </div>
        <div class="buy-button-wrapper">
          <a href="${GATALOG_URL}/product/${productId}" style="text-decoration: none; text-align: center; color: white;">Купити цей товар</a>
        </div>
        <div class="return-button-wrapper">
          <a href="${GATALOG_URL}" style="text-decoration: none; text-align: center; color: white;">Повернутися в магазин</a>
        </div>
      </body>
    </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
