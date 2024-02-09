const sgMail = require('@sendgrid/mail');

const { sendgridApiKey, fromEmail, catalogURL } = require('./getSendgridKeys');

sgMail.setApiKey(sendgridApiKey);

module.exports = async userRequest => {
  const { email, productName, vendorCode } = userRequest;

  const newEmail = {
    to: email,
    subject: `Запчастюлька - запит на появу товару (артикул ${vendorCode})`,
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
          .title {
            font-weight: 500;
            font-size: 24px;
            line-height: 1.2;
          }
          .text {
            font-weight: 500;
            font-size: 20px;
            line-height: 1.4;
            color: #1C1F23;
          }
          .return-button-wrapper {
            margin-top: 12px;
            text-align: left;
            font-weight: 500;
            font-size: 16px;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            background-color: #1570EF;
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
            <a href="${catalogURL}">
              <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
            <a/>
          </div>
          <p class="text" style="text-align: left;"> Ваш запит на інформування щодо появи товару "${productName}" прийнято. Як тільки товар з'явиться у продажу, ми автоматично повідомимо вас по e-mail </p>
          <h2 class="title" style="text-align: left; color: #1C1F23; margin-top: 20px; margin-bottom: 12px;">Дякуємо, що Ви з нами!</h2>
        </div>
        <div class="return-button-wrapper">
          <a href="${catalogURL}" style="text-decoration: none; text-align: center; color: white;">Повернутися в магазин</a>
        </div>
      </body>
    </html>
    `,
    from: fromEmail,
  };

  await sgMail.send(newEmail);

  return true;
};
