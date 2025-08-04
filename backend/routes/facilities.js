const router = require('express').Router();
let Facility = require('../models/facility.model');

// Get all facilities
router.route('/').get((req, res) => {
  Facility.find()
    .then(facilities => res.json(facilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new facility
router.route('/add').post((req, res) => {
  const { name, location, status, productionLines } = req.body;

  const newFacility = new Facility({
    name,
    location,
    status,
    productionLines,
  });

  newFacility.save()
    .then(() => res.json('Facility added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a facility by ID
router.route('/:id').get((req, res) => {
  Facility.findById(req.params.id)
    .then(facility => res.json(facility))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a facility by ID
router.route('/:id').delete((req, res) => {
  Facility.findByIdAndDelete(req.params.id)
    .then(() => res.json('Facility deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a facility by ID
router.route('/update/:id').post((req, res) => {
  Facility.findById(req.params.id)
    .then(facility => {
      facility.name = req.body.name;
      facility.location = req.body.location;
      facility.status = req.body.status;
      facility.productionLines = req.body.productionLines;

      facility.save()
        .then(() => res.json('Facility updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
