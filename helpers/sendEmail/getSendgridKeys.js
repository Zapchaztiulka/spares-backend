require('dotenv').config();

const {
  BASE_URL,
  SENDGRID_API_KEY_DEV,
  SENDGRID_API_KEY_PROD,
  SENDGRID_EMAIL_DEV,
  SENDGRID_EMAIL_PROD,
  GATALOG_URL,
  NODE_ENV,
} = process.env;

const sendgridApiKey =
  NODE_ENV === 'production' ? SENDGRID_API_KEY_PROD : SENDGRID_API_KEY_DEV;

const fromEmail =
  NODE_ENV === 'production' ? SENDGRID_EMAIL_PROD : SENDGRID_EMAIL_DEV;

const catalogURL = GATALOG_URL;
const baseURL = BASE_URL;

module.exports = { sendgridApiKey, fromEmail, catalogURL, baseURL };
