const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoEvidenceSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: String, required: true },
  video: { type: String, required: true },
  alert: {
    message: { type: String, required: true },
    severity: { type: String, required: true, enum: ['error', 'warning', 'info'] },
  },
  status: { type: String, required: true, enum: ['Under Review', 'Resolved', 'Maintenance Required', 'Cleared'] },
  facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
}, {
  timestamps: true,
});

const VideoEvidence = mongoose.model('VideoEvidence', videoEvidenceSchema);

module.exports = VideoEvidence;
