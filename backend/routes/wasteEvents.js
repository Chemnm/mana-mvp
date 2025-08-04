const router = require('express').Router();
let WasteEvent = require('../models/wasteEvent.model');

// Get all waste events
router.route('/').get((req, res) => {
  WasteEvent.find()
    .populate('facilityId')
    .populate('operatorId')
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new waste event
router.route('/add').post((req, res) => {
  const newWasteEvent = new WasteEvent(req.body);

  newWasteEvent.save()
    .then(() => res.json('Waste event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get waste events for a specific facility
router.route('/facility/:facilityId').get((req, res) => {
    WasteEvent.find({ facilityId: req.params.facilityId })
      .populate('operatorId')
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
