import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';
import type { ChatMessage } from '../types';

// Ignore any local error on this line. Vercel will understand it.
const apiKey = (import.meta.env as any).VITE_GEMINI_API_KEY;

// LOG 1: Check if the key exists on the server
console.log(`AI Assistant Initializing on Vercel. Is API Key present? ${!!apiKey}`);

const genAI = new GoogleGenerativeAI(apiKey!);

export const useAIAssistant = () => {
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // Only need user for the initial message

  const toggleAssistant = useCallback(() => {
    setAssistantOpen(prev => !prev);
    if (messages.length === 0) {
        setMessages([{ sender: 'ai', text: `Hello ${user?.name.split(' ')[0] || ''}! How can I help?` }]);
    }
  }, [messages.length, user]);
  
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
      
    // LOG 2: Confirm the function is being called
    console.log("Vercel: sendMessage function called. Preparing to contact AI.");

    const prompt = `User's query: "${message}"`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // LOG 3: Log a successful response
        console.log("Vercel: AI Assistant Success:", text);

        const aiMessage: ChatMessage = { sender: 'ai', text: text };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
        // LOG 4: THIS IS THE MOST IMPORTANT LOG. IT WILL SHOW US THE VERCEL ERROR.
        console.error("VERCEL AI ASSISTANT FAILED:", JSON.stringify({
            name: error.name,
            message: error.message,
            details: error.details,
        }));

        const errorMessage: ChatMessage = { sender: 'ai', text: "Sorry, an error occurred on the server." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, user]);

  return { isAssistantOpen, messages, isLoading, toggleAssistant, sendMessage };
};