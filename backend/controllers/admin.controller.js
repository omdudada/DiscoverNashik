const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../config/db.postgres");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { rows } = await query("select * from admins where email = $1", [email]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin.id, role: "admin", email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

async function analytics(req, res, next) {
  try {
    const [{ rows: places }, { rows: businesses }, { rows: pendingApps }] = await Promise.all([
      query("select count(*) from places"),
      query("select count(*) from businesses where status = 'approved'"),
      query("select count(*) from business_applications where status = 'pending'"),
    ]);
    res.json({
      totalPlaces: Number(places[0].count),
      approvedBusinesses: Number(businesses[0].count),
      pendingBusinessApplications: Number(pendingApps[0].count),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { login, analytics };
