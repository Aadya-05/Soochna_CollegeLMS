const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  recordAttendance,
  getAttendance,
  recordMarks,
  getMarks,
  createABA,
  getABA,
} = require('../controllers/facultyController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticate, authorizeRoles('faculty'));

router
  .route('/events')
  .get(getEvents)
  .post(createEvent);

router
  .route('/attendance')
  .get(getAttendance)
  .post(recordAttendance);

router
  .route('/marks')
  .get(getMarks)
  .post(recordMarks);

router
  .route('/aba')
  .get(getABA)
  .post(createABA);

module.exports = router;

