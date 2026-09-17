const { query } = require("../config/db.postgres");

// Haversine distance in km, computed in SQL to avoid pulling the whole
// places table into Node just to sort by distance.
async function nearby(req, res, next) {
  try {
    const { lat, lng, radiusKm = 5, category } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: "lat and lng are required" });

    const params = [lng, lat, radiusKm];
    let sql = `
      select p.*, c.slug as category_slug,
        (6371 * acos(cos(radians($2)) * cos(radians(p.latitude)) *
          cos(radians(p.longitude) - radians($1)) + sin(radians($2)) * sin(radians(p.latitude))
        )) as distance_km
      from places p
      join categories c on c.id = p.category_id
    `;
    if (category) {
      sql += ` where c.slug = $4`;
      params.push(category);
    }
    sql = `select * from (${sql}) sub where distance_km <= $3 order by distance_km asc`;

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { nearby };
