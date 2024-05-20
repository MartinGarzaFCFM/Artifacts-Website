const {Pool} = require('pg')
require('dotenv').config()
const { query } = require('express')

const pool = new Pool(
    {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT,
        ssl: {
          rejectUnauthorized: false // This option bypasses SSL certificate validation, required for many cloud providers
        }
      }
);

module.exports = {
    query: (text, params) => pool.query(text, params)
}