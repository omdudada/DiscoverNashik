const { query } = require("../config/db.postgres");

async function listEvents(req, res, next) {
  try {
    const { type } = req.query;
    const sql = type
      ? "select * from events where type = $1 order by starts_at asc"
      : "select * from events order by starts_at asc";
    const { rows } = await query(sql, type ? [type] : []);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const { title, type, description, startsAt, endsAt, locationPlaceId } = req.body;
    const { rows } = await query(
      `insert into events (title, type, description, starts_at, ends_at, location_place_id, created_by_admin_id)
       values ($1,$2,$3,$4,$5,$6,$7) returning *`,
      [title, type, description, startsAt, endsAt, locationPlaceId, req.user.id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { listEvents, createEvent };
