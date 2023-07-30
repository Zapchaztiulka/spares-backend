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
              text-align: center;
              margin-bottom: 30px;
            }
            
            img {
              max-width: 100%;
              height: auto;
              position: relative;
              left: 20px;
            }
          </style>
        </head>
        <body>
          <h3>Вас вітає магазин запасних частин агротехніки "Запчастулька"!</h3>
          <div class="image-container">
            <img src="" alt="Spare parts store" />
          </div>
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
