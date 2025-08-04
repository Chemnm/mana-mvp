import api from './axiosConfig';

export const saveMessage = async (message) => {
    try {
        const response = await api.post('/chat/messages', message);
        return response.data;
    } catch (error) {
        console.error('Failed to save message:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to save message');
    }
};

export const getChatHistory = async (sessionId) => {
    try {
        const response = await api.get(`/chat/sessions/${sessionId}/messages`);
        return response.data;
    } catch (error) {
        console.error('Failed to get chat history:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to get chat history');
    }
};

export const createChatSession = async (userId) => {
    try {
        const response = await api.post('/chat/sessions', { userId });
        return response.data;
    } catch (error) {
        console.error('Failed to create chat session:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to create chat session');
    }
};

export const getChatSessions = async (userId) => {
    try {
        const response = await api.get(`/chat/sessions/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get chat sessions:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to get chat sessions');
    }
};

export const renameChatSession = async (sessionId, newName) => {
    try {
        const response = await api.put(`/chat/sessions/${sessionId}/rename`, { summary: newName });
        return response.data;
    } catch (error) {
        console.error('Failed to rename chat session:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to rename chat session');
    }
};

export const deleteChatSession = async (sessionId) => {
    try {
        const response = await api.delete(`/chat/sessions/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete chat session:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : 'Failed to delete chat session');
    }
};
