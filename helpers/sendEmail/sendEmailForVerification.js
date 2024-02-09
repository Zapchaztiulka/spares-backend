const sgMail = require('@sendgrid/mail');

const {
  sendgridApiKey,
  fromEmail,
  catalogURL,
  baseURL,
} = require('./getSendgridKeys');

sgMail.setApiKey(sendgridApiKey);

module.exports = async (email, verificationToken) => {
  const newEmail = {
    to: email,
    subject: 'Spare parts store "Zapchaztiulka" - Verify your email',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
            
            h3 {
              color: #333;
              font-size: 24px;
              margin-bottom: 10px;
            }
            
            p {
              color: #666;
              font-size: 16px;
              margin-bottom: 20px;
            }
            
            .verification-text {
              color: #fff;
              font-size: 18px;
            }

            .verification-link {
              display: inline-block;
              font-size: 16px;
              color: #fff;
              background-color: #007bff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
            }

            .image-container {
              text-align: left;
              width: 210px;
              margin: 30px 0px 30px 0px;
            }
            
            img {
              max-width: 100%;
              height: auto;
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
          <div class="image-container">
            <a href="${catalogURL}">
              <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
            <a/>
          </div>
          <h3>Вас вітає магазин запасних частин агротехніки "Запчастюлька"!</h3>
          <p>Натисніть кнопку нижче, щоб підтвердити свою електронну адресу:</p>
          <a class="verification-link" target="_blank" href="${baseURL}/api/users/verify/${verificationToken}">
            <p class="verification-text">Підтвердити email</p>
          </a>
          <p>ВАЖЛИВО! Підтвердити пошту можна лише протягом 24 годин</p>
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
