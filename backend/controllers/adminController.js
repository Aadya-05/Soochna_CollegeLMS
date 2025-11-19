const db = require('../db');

exports.recordFees = async (req, res, next) => {
  try {
    const { student_name, usn, batch, fees, paid } = req.body;

    if (!student_name || !usn || !batch || fees === undefined || paid === undefined) {
      return res.status(400).json({ message: 'All fee fields are required' });
    }

    const result = await db.query(
      `INSERT INTO fees (student_name, usn, batch, fees, paid)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [student_name, usn, batch, fees, paid],
    );

    res.status(201).json({ message: 'Fees record added', fees: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getFees = async (_req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM fees ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.addStaff = async (req, res, next) => {
  try {
    const { staff_name, staff_id, salary } = req.body;

    if (!staff_name || !staff_id || !salary) {
      return res.status(400).json({ message: 'All staff fields are required' });
    }

    const result = await db.query(
      `INSERT INTO staff (staff_name, staff_id, salary)
       VALUES ($1, $2, $3) RETURNING *`,
      [staff_name, staff_id, salary],
    );

    res.status(201).json({ message: 'Staff added successfully', staff: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getStaff = async (_req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM staff ORDER BY staff_name');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.addCircular = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const result = await db.query(
      `INSERT INTO circulars (description)
       VALUES ($1) RETURNING *`,
      [description],
    );

    res.status(201).json({ message: 'Circular added', circular: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getCirculars = async (_req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM circulars ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

