const router = require('express').Router();
const Compliance = require('../models/compliance.model');
const mongoose = require('mongoose');

// Helper function to get filter based on facilityId
const getFacilityFilter = (facilityId) => {
  return facilityId ? { facilityId: new mongoose.Types.ObjectId(facilityId) } : {};
};

// GET Compliance Data (All Facilities)
router.route('/').get(async (req, res) => {
  try {
    const filter = {};
    const complianceData = await Compliance.find(filter).populate('operatorId', 'name');
    res.json(complianceData);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET Compliance Data (Specific Facility)
router.route('/:facilityId').get(async (req, res) => {
  try {
    const filter = getFacilityFilter(req.params.facilityId);
    const complianceData = await Compliance.find(filter).populate('operatorId', 'name');
    res.json(complianceData);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
