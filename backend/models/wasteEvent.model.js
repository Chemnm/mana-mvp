const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wasteEventSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  productionLine: {
    type: String,
    trim: true,
  },
  operatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  wasteType: {
    type: String,
    required: true,
    trim: true,
  },
  ingredient: {
    type: String,
    trim: true,
  },
  weightKg: {
    type: Number,
    required: true,
  },
  costUsd: {
    type: Number,
  },
  co2e: {
    type: Number,
  },
  videoSegmentUrl: {
    type: String,
    trim: true,
  },
  fullVideoUrl: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Under Review', 'Resolved', 'Action Required'],
    default: 'Under Review',
  },
  resolutionDetails: {
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    notes: { type: String, trim: true },
  },
}, {
  timestamps: true,
});

const WasteEvent = mongoose.model('WasteEvent', wasteEventSchema);

module.exports = WasteEvent;
