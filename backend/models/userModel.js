const db = require('../db');

exports.findByUsername = (username) => {
  return db.query('SELECT * FROM users WHERE username = $1', [username]);
};

exports.createUser = (username, password, role) => {
  return db.query(
    `INSERT INTO users (username, password, role)
     VALUES ($1, $2, $3)
     RETURNING id, username, role, created_at`,
    [username, password, role],
  );
};

