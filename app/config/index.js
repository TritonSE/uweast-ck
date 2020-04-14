const env = process.env.NODE_ENV || 'development';
const isDevelopment = env !== 'production';
if (isDevelopment) require('dotenv').config();

module.exports = {
  isDevelopment,

  port: process.env.PORT || 4000,

  logging: {
    level: 'info',
  },

  db: {
    uri: process.env.MONGODB_URI,
  },
};
