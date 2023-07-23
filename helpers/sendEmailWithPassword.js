const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = async (email, newPassword) => {
  const newEmail = {
    to: email,
    subject: 'Goose Track - New Password',
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
          <h3>Your new password: ${newPassword}.</h3>
          <p> Next time sign in with it </p>
          <p>You can change it in the User Profile.</p>
          <div class="image-container">
            <img src="https://oleh-kliapko.github.io/GooseTrack_front/static/media/goose2x.16fd9b28530c95574467.png" alt="Goose Flying" />
          </div>
        </body>
      </html>
    `,
    from: 'walletservice2023@gmail.com',
  };

  await sgMail.send(newEmail);

  return true;
};
