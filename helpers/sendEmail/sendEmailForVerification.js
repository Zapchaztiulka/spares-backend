const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

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
          </style>
        </head>
        <body>
          <div class="image-container">
            <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
          </div>
          <h3>Вас вітає магазин запасних частин агротехніки "Запчастулька"!</h3>
          <p>Натисніть кнопку нижче, щоб підтвердити свою електронну адресу:</p>
          <a class="verification-link" target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">
            <p class="verification-text">Підтвердити мій імейл</p>
          </a>
          <p>ВАЖЛИВО! Підтвердити пошту можна лише протягом 24 годин</p>

        </body>
      </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
