const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  productionLines: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
