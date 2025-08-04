const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  wasteEventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WasteEvent',
    required: true,
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  deliveredTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Delivered', 'Acknowledged', 'Action Taken'],
    default: 'Delivered',
  },
  acknowledgedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
