require("dotenv").config()
const env = process.env

const development = {
    "username": "root",
    "password": "rkd785985",
    "database": "Lv5",
    "host": "express-database.clplypyzjltq.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
  const test= {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  const production = {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  