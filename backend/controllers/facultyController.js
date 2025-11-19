const db = require('../db');

exports.createEvent = async (req, res, next) => {
  try {
    const facultyId = req.user.id;
    const { name, details, outcome, eventDate } = req.body;

    if (!name || !details || !outcome || !eventDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.query(
      `INSERT INTO events (faculty_id, name, details, outcome, event_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [facultyId, name, details, outcome, eventDate],
    );

    res.status(201).json({ message: 'Event added successfully', event: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const facultyId = req.user.id;
    const result = await db.query(
      'SELECT * FROM events WHERE faculty_id = $1 ORDER BY event_date DESC',
      [facultyId],
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.recordAttendance = async (req, res, next) => {
  try {
    const facultyId = req.user.id;
    const { attendance } = req.body;

    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({ message: 'Attendance data is required' });
    }

    const queries = attendance.map((record) =>
      db.query(
        `INSERT INTO attendance (student_usn, faculty_id, date, status)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [record.student_usn, facultyId, record.date, record.status],
      ),
    );

    await Promise.all(queries);

    res.status(201).json({ message: 'Attendance saved successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getAttendance = async (req, res, next) => {
  try {
    const facultyId = req.user.id;
    const result = await db.query(
      'SELECT * FROM attendance WHERE faculty_id = $1 ORDER BY date DESC',
      [facultyId],
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.recordMarks = async (req, res, next) => {
  try {
    const { course, student_usn, student_name, cie1, cie2, cie3 } = req.body;

    if (!course || !student_usn || !student_name) {
      return res.status(400).json({ message: 'Course, USN, and name are required' });
    }

    const result = await db.query(
      `INSERT INTO marks (course, student_usn, student_name, cie1, cie2, cie3)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [course, student_usn, student_name, cie1 || 0, cie2 || 0, cie3 || 0],
    );

    res.status(201).json({ message: 'Marks saved successfully', marks: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getMarks = async (_req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM marks ORDER BY course, student_name');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.createABA = async (req, res, next) => {
  try {
    const { course, topic, details, last_date } = req.body;

    if (!course || !topic || !details || !last_date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.query(
      `INSERT INTO aba (course, topic, details, last_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [course, topic, details, last_date],
    );

    res.status(201).json({ message: 'ABA saved successfully', aba: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.getABA = async (_req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM aba ORDER BY last_date');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

