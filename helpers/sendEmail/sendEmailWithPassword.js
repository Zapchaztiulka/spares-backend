const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, GATALOG_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (email, newPassword) => {
  const newEmail = {
    to: email,
    subject: 'Spare parts store "Zapchaztiulka" - New Password',
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
              font-size: 20px;
              margin-bottom: 10px;
            }
            
            p {
              color: #666;
              font-size: 16px;
              margin-bottom: 20px;
            }
            
            .image-container {
              text-align: left;
              width: 210px;
              margin: 30px 0px 30px 0px;
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
          <div class="image-container">
            <a href="${GATALOG_URL}">
              <img src="https://i.ibb.co/dLzbcCg/logo-blue.jpg" alt="Spare parts store" />
            <a/>
          </div>
          <h3>Ваш новий пароль: ${newPassword}.</h3>
          <p>Наступного разу використовуйте його при вході в магазин</p>
          <p>Також Ви можете змінити пароль в сторінці "Профілю користувача".</p>
          <h3>
            <a href="${GATALOG_URL}"> Повернутися в магазин >>> <a/>
          </h3>
        </body>
      </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
