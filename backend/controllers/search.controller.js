const { query } = require("../config/db.postgres");

async function search(req, res, next) {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const { rows } = await query(
      "select id, name, category_id, latitude, longitude from places where name ilike $1 order by name limit 20",
      [`%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { search };
