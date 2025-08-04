const router = require('express').Router();
const VideoEvidence = require('../models/videoEvidence.model');
const mongoose = require('mongoose');

// Helper function to get filter based on facilityId
const getFacilityFilter = (facilityId) => {
  return facilityId ? { facilityId: new mongoose.Types.ObjectId(facilityId) } : {};
};

// GET Video Evidence (All Facilities)
router.route('/').get(async (req, res) => {
  try {
    const filter = {};
    const videoEvidence = await VideoEvidence.find(filter);
    res.json(videoEvidence);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET Video Evidence (Specific Facility)
router.route('/:facilityId').get(async (req, res) => {
  try {
    const filter = getFacilityFilter(req.params.facilityId);
    const videoEvidence = await VideoEvidence.find(filter);
    res.json(videoEvidence);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
