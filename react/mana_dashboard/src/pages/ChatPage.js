import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Paper, TextField, IconButton, Typography, List, ListItem, ListItemText, Divider, ListItemButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Send, AddComment, Settings, MoreVert } from '@mui/icons-material';
import useChatStore from '../store/chatStore';
import useAuthStore from '../store/authStore';
import { getAiResponse } from '../api/aiService';
import { saveMessage, getChatHistory, createChatSession, getChatSessions, renameChatSession, deleteChatSession } from '../api/chatService';
import TypingMessage from '../components/chatbot/TypingMessage';
import manaLogo from '../assets/mana-logo.png';
import './ChatPage.css';

const ChatPage = () => {
  const { messages, addMessage, setMessages, sessions, setSessions, activeSession, setActiveSession } = useChatStore();
  const { user } = useAuthStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const theme = useTheme();

  const handleMenuOpen = (event, session) => {
    setAnchorEl(event.currentTarget);
    setSelectedSession(session);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSession(null);
  };

  const handleShare = () => {
    const chatText = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
    navigator.clipboard.writeText(chatText);
    handleMenuClose();
  };

  const handleRename = async () => {
    const newName = prompt("Enter new chat name:", selectedSession.summary);
    if (newName && newName.trim() !== '') {
      const updatedSession = await renameChatSession(selectedSession._id, newName);
      const updatedSessions = sessions.map(s => s._id === selectedSession._id ? updatedSession : s);
      setSessions(updatedSessions);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      await deleteChatSession(selectedSession._id);
      const updatedSessions = sessions.filter(s => s._id !== selectedSession._id);
      setSessions(updatedSessions);
      if (activeSession && activeSession._id === selectedSession._id) {
        setActiveSession(updatedSessions.length > 0 ? updatedSessions[0] : null);
      }
    }
    handleMenuClose();
  };

  const scrollToBottom = useCallback(() => {
    if (!isUserScrolledUp) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserScrolledUp]);

  useEffect(() => {
    const loadSessions = async () => {
      if (user && user.id) {
        const userSessions = await getChatSessions(user.id);
        setSessions(userSessions);
        if (userSessions.length > 0) {
          setActiveSession(userSessions[0]);
        }
      }
    };
    loadSessions();
  }, [user, setSessions, setActiveSession]);

  useEffect(() => {
    const loadHistory = async () => {
      if (activeSession) {
        const history = await getChatHistory(activeSession._id);
        setMessages(history);
      } else {
        setMessages([]);
      }
    };
    loadHistory();
  }, [activeSession, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isUserScrolledUp, scrollToBottom]);

  useEffect(() => {
    if (isLoading) {
      const scrollInterval = setInterval(() => {
        scrollToBottom();
      }, 100);
      return () => clearInterval(scrollInterval);
    }
  }, [isLoading, scrollToBottom]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 5) {
      setIsUserScrolledUp(false);
    } else {
      setIsUserScrolledUp(true);
    }
  };

  const handleSend = async (promptText) => {
    const textToSend = typeof promptText === 'string' ? promptText : input;
    if (textToSend.trim() && user && user.id) {
      let currentSession = activeSession;
      let isNewChat = false;

      if (!currentSession) {
        currentSession = await createChatSession(user.id);
        setActiveSession(currentSession);
        setSessions([currentSession, ...sessions]);
        isNewChat = true;
      } else if (currentSession.summary === 'New Chat' && messages.length === 0) {
        isNewChat = true;
      }

      const userMessage = { userId: user.id, sessionId: currentSession._id, text: textToSend, sender: 'user' };
      addMessage(userMessage);
      await saveMessage(userMessage);
      setInput('');
      setIsLoading(true);
      setIsUserScrolledUp(false);

      const aiResponse = await getAiResponse(textToSend, user.id, user.facilityId);
      
      if (isNewChat && aiResponse.summary) {
        const updatedSession = await renameChatSession(currentSession._id, aiResponse.summary);
        const updatedSessions = sessions.map(s => s._id === currentSession._id ? updatedSession : s);
        setSessions(updatedSessions);
        setActiveSession(updatedSession);
      }

      const aiMessage = { userId: user.id, sessionId: currentSession._id, text: aiResponse.response, sender: 'ai' };
      addMessage(aiMessage);
      await saveMessage(aiMessage);
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    if (user && user.id) {
      const newSession = await createChatSession(user.id);
      setActiveSession(newSession);
      setSessions([newSession, ...sessions]);
      setMessages([]);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', backgroundColor: 'background.paper' }}>
      {/* Sidebar */}
      <Box sx={{ width: '250px', backgroundColor: 'background.default', p: 2, display: 'flex', flexDirection: 'column', borderRight: 1, borderColor: 'divider' }}>
        <Typography variant="h5" sx={{ color: 'text.primary', mb: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }}>Navi</Typography>
        <IconButton onClick={handleNewChat} sx={{ color: 'text.primary', backgroundColor: 'background.paper', mb: 2, alignSelf: 'flex-start' }}>
          <AddComment />
        </IconButton>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          {sessions.map((session) => (
            <ListItem key={session._id} disablePadding secondaryAction={
              <IconButton edge="end" aria-label="more" onClick={(e) => handleMenuOpen(e, session)}>
                <MoreVert />
              </IconButton>
            }>
              <ListItemButton selected={activeSession && activeSession._id === session._id} onClick={() => setActiveSession(session)}>
                <ListItemText primary={session.summary} sx={{ color: 'text.primary' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleShare}>Share</MenuItem>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <Divider sx={{ backgroundColor: 'divider' }} />
        <IconButton sx={{ color: 'text.primary', mt: 2, alignSelf: 'flex-start' }}>
          <Settings />
        </IconButton>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, height:  '94vh' }}>
        {messages.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'text.primary' }}>
            <img src={manaLogo} alt="Navi" style={{ width: 60, height: 60, marginBottom: 20 }} />
            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }}></Typography>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif' }}>Hi 👋 I'm Navi, how can I help?</Typography>
          </Box>
        ) : (
          <Box ref={chatContainerRef} onScroll={handleScroll} sx={{ flex: 1, overflowY: 'auto', mb: 2, '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {messages.map((msg, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 2, alignItems: 'flex-start' }}>
                {msg.sender === 'user' ? (
                  <Paper sx={{ p: 2, backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0', color: 'text.primary', borderRadius: '20px 20px 0 20px', maxWidth: '70%' }}>
                    <Typography>{msg.text}</Typography>
                  </Paper>
                ) : (
                  <>
                  <img src={manaLogo} alt="Navi" style={{ width: 30, height: 30, marginRight: 10 }} />
                  <Box sx={{ color: 'text.primary', maxWidth: '70%' }}>
                    <TypingMessage text={msg.text} shouldAnimate={index === messages.length - 1 && msg.sender === 'ai'} />
                  </Box>
                </>
                )}
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, alignItems: 'flex-start' }}>
                <img src={manaLogo} alt="Navi" style={{ width: 30, height: 30, marginRight: 10 }} className="spinning-logo" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        )}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'What were the main causes of waste last week?',
            'What are the most important steps to prevent waste',
            'Provide report for previous quarter'
          ].map((prompt) => (
            <ListItemButton
              key={prompt}
              onClick={() => handleSend(prompt)}
              sx={{
                p: '8px 12px',
                borderRadius: '20px',
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#e0e0e0',
                },
                flexGrow: 1,
                maxWidth: 'calc(33.333% - 8px)',
                textAlign: 'center'
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{prompt}</Typography>
            </ListItemButton>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'background.default', borderRadius: '25px' }}>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Enter a prompt for Navi"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              '& .MuiInput-underline:before': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:after': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <IconButton onClick={handleSend} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0', color: 'text.primary' }}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
