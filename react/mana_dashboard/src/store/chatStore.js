import { create } from 'zustand';

const useChatStore = create((set) => ({
  messages: [],
  sessions: [],
  activeSession: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  setSessions: (sessions) => set({ sessions }),
  setActiveSession: (session) => set({ activeSession: session }),
}));

export default useChatStore;
