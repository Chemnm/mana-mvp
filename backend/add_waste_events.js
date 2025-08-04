const mongoose = require('mongoose');
require('dotenv').config();

const Facility = require('./models/facility.model');
const WasteEvent = require('./models/wasteEvent.model');
const User = require('./models/user.model');

const addWasteEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const facility = await Facility.findOne({ name: 'Tzfat Factory' });
    if (!facility) {
      console.log('Tzfat Factory not found.');
      return;
    }
    console.log(`Found facility: ${facility.name}`);

    const user = await User.findOne({ facilityId: facility._id, role: 'Operator' });
    if (!user) {
        console.log('Operator for Tzfat Factory not found.');
        return;
    }
    console.log(`Found user: ${user.name}`);

    const wasteTypes = ['Spillage', 'Contamination', 'Overproduction', 'Packaging Defect', 'Ingredient Error'];
    const videoUrls = [
        'https://public-waste-demos.s3.il-central-1.amazonaws.com/pouring-flower.mp4',
        'https://public-waste-demos.s3.il-central-1.amazonaws.com/machine-jammed.mp4',
        'https://public-waste-demos.s3.il-central-1.amazonaws.com/no-gloves.mp4',
    ];

    let newEvents = [];
    const now = new Date();
    for (let i = 0; i < 5; i++) {
      const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const hour = timestamp.getHours();

      // Simulate higher waste during work hours (8am - 5pm)
      const isWorkHour = hour >= 8 && hour <= 17;
      const cost = isWorkHour ? (Math.random() * 40 + 20) : (Math.random() * 10 + 5); // Higher cost during work hours
      const weight = isWorkHour ? (Math.random() * 15 + 5) : (Math.random() * 5 + 1); // Higher weight during work hours

      const newEvent = {
        timestamp: timestamp,
        facilityId: facility._id,
        productionLine: facility.productionLines[Math.floor(Math.random() * facility.productionLines.length)],
        operatorId: user._id,
        wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
        weightKg: weight.toFixed(2),
        costUsd: cost.toFixed(2),
        co2e: (cost * 0.5).toFixed(2), // Correlate CO2e with cost
        videoSegmentUrl: videoUrls[Math.floor(Math.random() * videoUrls.length)],
        status: ['Under Review', 'Resolved'][Math.floor(Math.random() * 2)],
      };
      newEvents.push(newEvent);
    }

    await WasteEvent.insertMany(newEvents);
    console.log('5 new waste events added successfully for Tzfat Factory.');

  } catch (err) {
    console.error('Error adding waste events:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

addWasteEvents();
