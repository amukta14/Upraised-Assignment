const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('postgres://imf_gadget_db_91u3_user:MeXnGhLuXHrQ7XIDoO4gtbaJNR15ikWo@dpg-d0pkr0re5dus73dumn10-a:5432/imf_gadget_db_91u3', {
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
});

module.exports = sequelize; 