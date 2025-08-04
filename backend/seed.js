const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

const User = require('./models/user.model');
const Facility = require('./models/facility.model');
const WasteEvent = require('./models/wasteEvent.model');
const Recommendation = require('./models/recommendation.model');
const VideoEvidence = require('./models/videoEvidence.model');
const Compliance = require('./models/compliance.model');

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing data
  await User.deleteMany({});
  await Facility.deleteMany({});
  await WasteEvent.deleteMany({});
  await Recommendation.deleteMany({});
  await VideoEvidence.deleteMany({});
  await Compliance.deleteMany({});
  console.log('Previous data cleared.');

  // Seed Facilities
  const facilities = await Facility.insertMany([
    { name: 'Tzfat Factory', location: 'Tzfat, Israel', productionLines: ['Line 1', 'Line 2', 'Line 3'] },
    { name: 'Karmiel Factory', location: 'Karmiel, Israel', productionLines: ['Line A', 'Line B'] },
    { name: 'London Factory', location: 'London, UK', productionLines: ['Alpha Line', 'Beta Line'] },
    { name: 'Head Office', location: 'Virtual', status: 'Active' },
  ]);
  console.log(`${facilities.length} facilities seeded.`);

  // Seed Users
  const users = await User.insertMany([
    // Tzfat Users
    { email: 'joe-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Joe', facilityId: facilities[0]._id },
    { email: 'jane-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Jane', facilityId: facilities[0]._id },
    { email: 'sara-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Sara', facilityId: facilities[0]._id },
    { email: 'michael-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Michael', facilityId: facilities[0]._id },
    { email: 'david-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'David', facilityId: facilities[0]._id },
    { email: 'rachel-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Rachel', facilityId: facilities[0]._id },
    { email: 'manager-tzfat@manaintelligence.ai', password: 'manaDemo613', role: 'Manager', name: 'Manager Tzfat', facilityId: facilities[0]._id },
    // Karmiel Users
    { email: 'joe-karmiel@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Joe', facilityId: facilities[1]._id },
    { email: 'jane-karmiel@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Jane', facilityId: facilities[1]._id },
    { email: 'sara-karmiel@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Sara', facilityId: facilities[1]._id },
    { email: 'michael-karmiel@manaintelligence.ai', password: 'manaDemo613', role: 'Operator', name: 'Michael', facilityId: facilities[1]._id },
    { email: 'manager-karmiel@manaintelligence.ai', password: 'manaDemo613', role: 'Manager', name: 'Manager Karmiel', facilityId: facilities[1]._id },
    // London User
    { email: 'manager-london@manaintelligence.ai', password: 'manaDemo613', role: 'Manager', name: 'Manager London', facilityId: facilities[2]._id },
    // General Users
    { email: 'executive@manaintelligence.ai', password: 'manaDemo613', role: 'Executive', name: 'Executive User' },
    { email: 'admin@manaintelligence.ai', password: 'manaDemo613', role: 'Admin', name: 'Admin User' },
    { email: 'retail@manaintelligence.ai', password: 'manaDemo613', role: 'Retail', name: 'Retail User' },
  ]);
  console.log(`${users.length} users seeded.`);

  // Seed Waste Events and Recommendations 
  let wasteEvents = [];
  let recommendations = [];
  const wasteTypes = ['Spillage', 'Contamination', 'Overproduction', 'Packaging Defect', 'Ingredient Error'];
  const ingredients = ['Flour', 'Cheese', 'Milk', 'Sugar', 'Eggs'];
  
  for (const facility of facilities.filter(f => f.name !== 'Head Office')) {
    const facilityOperators = users.filter(u => u.facilityId && u.facilityId.equals(facility._id) && u.role === 'Operator');
    for (const operator of facilityOperators) {
      for (let i = 0; i < 20; i++) { // 20 events per operator
        const event = await WasteEvent.create({
            timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random time in last 30 days
            facilityId: facility._id,
            productionLine: facility.productionLines[Math.floor(Math.random() * facility.productionLines.length)],
            operatorId: operator._id,
            wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
            ingredient: ingredients[Math.floor(Math.random() * ingredients.length)],
            weightKg: (Math.random() * 20 + 1).toFixed(2),
            costUsd: (Math.random() * 50 + 5).toFixed(2),
            co2e: (Math.random() * 10 + 1).toFixed(2),
            status: ['Under Review', 'Resolved'][Math.floor(Math.random() * 2)],
        });
        wasteEvents.push(event);

        if (Math.random() > 0.5) { // Create a recommendation for about half the events
            const rec = await Recommendation.create({
                wasteEventId: event._id,
                facilityId: facility._id,
                message: `Check calibration for ${event.wasteType} on ${event.productionLine}.`,
                deliveredTo: operator._id,
            });
            recommendations.push(rec);
        }
      }
    }
  }
  console.log(`${wasteEvents.length} waste events seeded.`);
  console.log(`${recommendations.length} recommendations seeded.`);

  // Seed Video Evidence
  const videoEvidenceData = [
    {
      title: 'PPE Violation',
      timestamp: '14:35:42',
      video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/no-gloves.mp4',
      alert: {
        message: 'CRITICAL: Worker without gloves detected - Contamination risk!',
        severity: 'error'
      },
      status: 'Under Review',
      facilityId: facilities[0]._id
    },
    {
      title: 'Overpouring Incident',
      timestamp: '14:41:18',
      video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/pouring-flower.mp4',
      alert: {
        message: 'WARNING: Excessive flour detected - 40% above recipe spec.',
        severity: 'warning'
      },
      status: 'Resolved',
      facilityId: facilities[0]._id
    },
    {
      title: 'Equipment Malfunction',
      timestamp: '14:47:03',
      video: 'https://public-waste-demos.s3.il-central-1.amazonaws.com/machine-jammed.mp4',
      alert: {
        message: 'ALERT: Conveyor belt jammed - Production halted.',
        severity: 'error'
      },
      status: 'Maintenance Required',
      facilityId: facilities[1]._id
    }
  ];

  await VideoEvidence.insertMany(videoEvidenceData);
  console.log(`${videoEvidenceData.length} video evidence records seeded.`);

  // Seed Compliance Data
  const complianceData = [];
  for (const facility of facilities.filter(f => f.name !== 'Head Office')) {
    const facilityOperators = users.filter(u => u.facilityId && u.facilityId.equals(facility._id) && u.role === 'Operator');
    for (const operator of facilityOperators) {
      for (let i = 0; i < 10; i++) { // 10 compliance records per operator
        complianceData.push({
          operatorId: operator._id,
          facilityId: facility._id,
          score: Math.floor(Math.random() * 21) + 80, // Score between 80 and 100
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        });
      }
    }
  }
  await Compliance.insertMany(complianceData);
  console.log(`${complianceData.length} compliance records seeded.`);

  console.log('Database seeded successfully!');
  mongoose.connection.close();
};

seedDB().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
