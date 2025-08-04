// v1.2
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://mvp.manaintelligence.ai', 'https://demo.manaintelligence.ai']
}));
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Routes
const facilitiesRouter = require('./routes/facilities');
const usersRouter = require('./routes/users');
const wasteEventsRouter = require('./routes/wasteEvents');
const recommendationsRouter = require('./routes/recommendations');
const analyticsRouter = require('./routes/analytics');
const videoEvidenceRouter = require('./routes/videoEvidence');
const complianceRouter = require('./routes/compliance');
const chatRouter = require('./routes/chat');

app.use('/facilities', facilitiesRouter);
app.use('/users', usersRouter);
app.use('/waste-events', wasteEventsRouter);
app.use('/recommendations', recommendationsRouter);
app.use('/analytics', analyticsRouter);
app.use('/video-evidence', videoEvidenceRouter);
app.use('/compliance', complianceRouter);
app.use('/chat', chatRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port: ${port}`);
});
// Trivial change to trigger restart
