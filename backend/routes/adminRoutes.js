const express = require('express');
const router = express.Router();
const {
  recordFees,
  getFees,
  addStaff,
  getStaff,
  addCircular,
  getCirculars,
} = require('../controllers/adminController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.use(authenticate, authorizeRoles('admin'));

router
  .route('/fees')
  .get(getFees)
  .post(recordFees);

router
  .route('/staff')
  .get(getStaff)
  .post(addStaff);

router
  .route('/circulars')
  .get(getCirculars)
  .post(addCircular);

module.exports = router;

