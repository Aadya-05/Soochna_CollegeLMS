const { Pool } = require("pg");
require("dotenv").config();   // <-- MUST BE FIRST

// Debug print to confirm .env is working
console.log("DB ENV values loaded:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const connectionOptions = {};

if (process.env.DATABASE_URL) {
  connectionOptions.connectionString = process.env.DATABASE_URL;
} else {
  connectionOptions.host = process.env.DB_HOST || 'localhost';
  connectionOptions.port = Number(process.env.DB_PORT) || 5432;
  connectionOptions.database = process.env.DB_NAME || 'college_db';
  connectionOptions.user = process.env.DB_USER || 'postgres';
  connectionOptions.password = process.env.DB_PASSWORD || 'postgres';
}

if (process.env.DB_SSL === 'true') {
  connectionOptions.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(connectionOptions);

pool.on('error', (err) => {
  console.error('Unexpected database error', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};

