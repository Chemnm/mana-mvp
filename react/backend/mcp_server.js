const { McpServer } = require('@mcp/server');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Facility = require('./models/facility.model');
const WasteEvent = require('./models/wasteEvent.model');
const Compliance = require('./models/compliance.model');
const Recommendation = require('./models/recommendation.model');
const VideoEvidence = require('./models/videoEvidence.model');

require('dotenv').config();

const server = new McpServer();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

server.addResource('mana/users', async () => {
    return User.find();
});

server.addResource('mana/users/:userId', async (userId) => {
    return User.findById(userId);
});

server.addResource('mana/facilities', async () => {
    return Facility.find();
});

server.addResource('mana/facilities/:facilityId', async (facilityId) => {
    return Facility.findById(facilityId);
});

server.addResource('mana/waste-events', async (params) => {
    if (params.userId) {
        return WasteEvent.find({ operatorId: params.userId });
    }
    if (params.facilityId) {
        return WasteEvent.find({ facilityId: params.facilityId });
    }
    return WasteEvent.find();
});

server.addResource('mana/compliance-scores', async (params) => {
    if (params.userId) {
        return Compliance.find({ operatorId: params.userId });
    }
    if (params.facilityId) {
        return Compliance.find({ facilityId: params.facilityId });
    }
    return Compliance.find();
});

server.addResource('mana/recommendations', async (params) => {
    if (params.userId) {
        return Recommendation.find({ deliveredTo: params.userId });
    }
    if (params.facilityId) {
        return Recommendation.find({ facilityId: params.facilityId });
    }
    return Recommendation.find();
});

server.addResource('mana/video-evidence', async (params) => {
    if (params.facilityId) {
        return VideoEvidence.find({ facilityId: params.facilityId });
    }
    return VideoEvidence.find();
});


server.listen(3001);
