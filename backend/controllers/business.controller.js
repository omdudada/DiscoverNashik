const { query } = require("../config/db.postgres");

async function applyBusiness(req, res, next) {
  try {
    const { name, categoryId, description, contactInfo, photos } = req.body;
    const { rows: businessRows } = await query(
      `insert into businesses (name, category_id, description, contact_info, photos, status)
       values ($1,$2,$3,$4,$5,'pending') returning *`,
      [name, categoryId, description, contactInfo, photos || []]
    );
    const business = businessRows[0];
    const { rows: appRows } = await query(
      `insert into business_applications (business_id, submitted_data, status)
       values ($1,$2,'pending') returning *`,
      [business.id, JSON.stringify(req.body)]
    );
    res.status(201).json({ business, application: appRows[0] });
  } catch (err) {
    next(err);
  }
}

async function getApplicationStatus(req, res, next) {
  try {
    const { rows } = await query("select * from business_applications where id = $1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "Application not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

// Admin-only.
async function reviewApplication(req, res, next) {
  try {
    const { decision } = req.body; // 'approved' | 'rejected'
    const { rows } = await query(
      `update business_applications set status = $2, reviewed_by_admin_id = $3, reviewed_at = now()
       where id = $1 returning *`,
      [req.params.id, decision, req.user.id]
    );
    const application = rows[0];
    if (!application) return res.status(404).json({ error: "Application not found" });

    await query("update businesses set status = $2, reviewed_by_admin_id = $3 where id = $1", [
      application.business_id, decision, req.user.id,
    ]);
    res.json(application);
  } catch (err) {
    next(err);
  }
}

module.exports = { applyBusiness, getApplicationStatus, reviewApplication };
