require('dotenv').config()
const env = process.env

const config = {
  development: {
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASSWORD || "rkd785985",
    "database": process.env.DB_NAME || "Lv5",
    "host": process.env.DB_HOST || "express-database.clplypyzjltq.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  test : {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },production : {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

}
module.exports = config;