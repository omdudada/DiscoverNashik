const { Pool } = require("pg");

// Structured/relational data lives here: places, categories, businesses,
// business_applications, admins, events. See models/postgres/schema.sql.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected Postgres pool error", err);
});

module.exports = { pool, query: (text, params) => pool.query(text, params) };
