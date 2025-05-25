const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'imf_gadget_db_91u3',
  process.env.DB_USER || 'imf_gadget_db_91u3_user',
  process.env.DB_PASSWORD || 'MeXnGhLuXHrQ7XIDoO4gtbaJNR15ikWo',
  {
    host: process.env.DB_HOST || 'dpg-d0pkr0re5dus73dumn10-a',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize; 