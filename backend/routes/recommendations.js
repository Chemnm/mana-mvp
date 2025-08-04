const router = require('express').Router();
let Recommendation = require('../models/recommendation.model');

// Get all recommendations
router.route('/').get((req, res) => {
  Recommendation.find()
    .populate('wasteEventId')
    .populate('facilityId')
    .populate('deliveredTo')
    .then(recommendations => res.json(recommendations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new recommendation
router.route('/add').post((req, res) => {
  const newRecommendation = new Recommendation(req.body);

  newRecommendation.save()
    .then(() => res.json('Recommendation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
