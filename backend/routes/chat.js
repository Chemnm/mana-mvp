const router = require('express').Router();
const ChatMessage = require('../models/chatMessage.model');
const ChatSession = require('../models/chatSession.model');

// POST a new chat session
router.route('/sessions').post(async (req, res) => {
  try {
    const { userId } = req.body;
    const newSession = new ChatSession({ userId, summary: 'New Chat' });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET all chat sessions for a user
router.route('/sessions/:userId').get(async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET all messages for a session
router.route('/sessions/:sessionId/messages').get(async (req, res) => {
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// POST a new chat message
router.route('/messages').post(async (req, res) => {
  try {
    const { userId, sessionId, sender, text } = req.body;
    const newMessage = new ChatMessage({ userId, sessionId, sender, text });
    await newMessage.save();
    await ChatSession.findByIdAndUpdate(sessionId, { $push: { messages: newMessage._id } });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// PUT (rename) a chat session
router.route('/sessions/:sessionId/rename').put(async (req, res) => {
  try {
    const { summary } = req.body;
    const updatedSession = await ChatSession.findByIdAndUpdate(req.params.sessionId, { summary }, { new: true });
    res.json(updatedSession);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// DELETE a chat session
router.route('/sessions/:sessionId').delete(async (req, res) => {
  try {
    await ChatMessage.deleteMany({ sessionId: req.params.sessionId });
    await ChatSession.findByIdAndDelete(req.params.sessionId);
    res.json('Chat session deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
