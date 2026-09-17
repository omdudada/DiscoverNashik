const { query } = require("../config/db.postgres");

const FALLBACK_PLACES = [
  { id: "trimbakeshwar", name: "Trimbakeshwar Shiva Temple", category_slug: "temples", category_name: "Temples & Pilgrimage", icon: "🛕", description: "One of the 12 sacred Jyotirlingas in India. Holy origin of Godavari River.", location: "Trimbak, Nashik", distance_km: 28, price_range: "Free", rating: 4.9, latitude: 19.9321, longitude: 73.5307 },
  { id: "ramkund", name: "Ramkund Sacred Ghat", category_slug: "ghats", category_name: "Ghats", icon: "🌊", description: "Holiest bathing ghat in Nashik on Godavari River. Core Kumbh Mela Shahi Snan site.", location: "Panchavati, Nashik", distance_km: 2.1, price_range: "Free", rating: 4.8, latitude: 20.0063, longitude: 73.7932 },
  { id: "kalaram-temple", name: "Kalaram Temple", category_slug: "temples", category_name: "Temples & Pilgrimage", icon: "🛕", description: "Historic 1782 black stone temple dedicated to Lord Rama in Panchavati.", location: "Panchavati, Nashik", distance_km: 2.5, price_range: "Free", rating: 4.7, latitude: 20.0078, longitude: 73.7954 },
  { id: "sula-vineyards", name: "Sula Vineyards", category_slug: "attractions", category_name: "Tourist Attractions", icon: "📍", description: "Pioneer winery offering vineyard tours, wine tasting, and scenic dining.", location: "Gangapur Road, Nashik", distance_km: 12.4, price_range: "₹600", rating: 4.6, latitude: 19.9975, longitude: 73.6845 },
  { id: "sadhana-misal", name: "Sadhana Chulivarchi Misal", category_slug: "food", category_name: "Food & Restaurants", icon: "🍽️", description: "Famous authentic clay-pot spicy Misal Pav served with fresh jalebis.", location: "Gangapur Road, Nashik", distance_km: 7.5, price_range: "₹150", rating: 4.7, latitude: 20.0215, longitude: 73.7420 },
];

async function listPlaces(req, res, next) {
  try {
    const { category } = req.query;
    const sql = category
      ? "select p.*, c.slug as category_slug from places p join categories c on c.id = p.category_id where c.slug = $1 order by p.name"
      : "select p.*, c.slug as category_slug from places p join categories c on c.id = p.category_id order by p.name";
    const { rows } = await query(sql, category ? [category] : []);
    res.json(rows);
  } catch {
    // If DB is offline/unseeded, return clean fallback data
    const { category } = req.query;
    if (category) {
      return res.json(FALLBACK_PLACES.filter((p) => p.category_slug === category));
    }
    res.json(FALLBACK_PLACES);
  }
}

async function getPlace(req, res, next) {
  try {
    const { rows } = await query("select * from places where id = $1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "Place not found" });
    res.json(rows[0]);
  } catch {
    const found = FALLBACK_PLACES.find((p) => p.id === req.params.id);
    if (found) return res.json(found);
    res.status(404).json({ error: "Place not found" });
  }
}

async function createPlace(req, res, next) {
  try {
    const { name, categoryId, description, latitude, longitude, priceRange, timings } = req.body;
    const { rows } = await query(
      `insert into places (name, category_id, description, latitude, longitude, price_range, timings, created_by_admin_id)
       values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
      [name, categoryId, description, latitude, longitude, priceRange, timings, req.user?.id || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updatePlace(req, res, next) {
  try {
    const fields = req.body;
    const setClauses = Object.keys(fields).map((key, i) => `${key} = $${i + 2}`);
    const { rows } = await query(
      `update places set ${setClauses.join(", ")}, updated_at = now() where id = $1 returning *`,
      [req.params.id, ...Object.values(fields)]
    );
    if (!rows[0]) return res.status(404).json({ error: "Place not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deletePlace(req, res, next) {
  try {
    await query("delete from places where id = $1", [req.params.id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listPlaces, getPlace, createPlace, updatePlace, deletePlace };
