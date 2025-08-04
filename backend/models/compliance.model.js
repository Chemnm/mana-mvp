const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complianceSchema = new Schema({
  operatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  facilityId: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Compliance = mongoose.model('Compliance', complianceSchema);

module.exports = Compliance;
 