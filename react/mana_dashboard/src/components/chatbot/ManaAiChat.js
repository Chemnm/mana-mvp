import React, { useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChatPage from '../../pages/ChatPage';
import manaLogo from '../../assets/mana-logo.png';

const ManaAiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          backgroundColor: theme.palette.mode === 'dark' ? '#5a5a5a' : '#e0e0e0',
          width: 60,
          height: 60,
          zIndex: 1301,
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#6a6a6a' : '#d0d0d0',
          },
        }}
      >
        <img src={manaLogo} alt="Navi" style={{ width: '60%', height: '60%' }} />
      </IconButton>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="mana-ai-chat-modal"
        aria-describedby="mana-ai-chat-interface"
        sx={{ zIndex: 1302 }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          height: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          outline: 'none',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <ChatPage />
        </Box>
      </Modal>
    </>
  );
};

export default ManaAiChat;
