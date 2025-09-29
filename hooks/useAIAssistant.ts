// src/hooks/useAIAssistant.ts

import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../contexts/AuthContext';
import type { ChatMessage } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is not defined. Check your .env file and restart your server.");
}

const genAI = new GoogleGenerativeAI(apiKey!);

export const useAIAssistant = () => {
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, schedule, smartwatchData, fatigueRisk, expenses } = useAuth();

  const toggleAssistant = useCallback(() => {
    setAssistantOpen(prev => !prev);
    if (messages.length === 0) {
        setMessages([
            { sender: 'ai', text: `Hello ${user?.name.split(' ')[0] || ''}! I'm Ava. How can I help you today?` }
        ]);
    }
  }, [messages.length, user]);
  
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
      
    const context = `
      You are Ava, a helpful AI assistant for aviation crew. Keep your answers brief.
      
      USER DATA:
      - Name: ${user?.name}
      - Role: ${user?.role}
      - High Fatigue Risk: ${fatigueRisk ? 'Yes' : 'No'}
      
      SMARTWATCH DATA:
      - Heart Rate: ${smartwatchData?.heartRate} bpm
      - SpO2: ${smartwatchData?.spO2}%
      - Stress: ${smartwatchData?.stressLevel}/10
      
      UPCOMING SCHEDULE (next 3):
      ${schedule.slice(0, 3).map(s => `- ${s.title} on ${new Date(s.start).toLocaleDateString()}`).join('\n')}
    `;
    
    const prompt = `${context}\n\nUser Query: "${message}"`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const aiMessage: ChatMessage = { sender: 'ai', text: text };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("AI Assistant Error:", error);
        const errorMessage: ChatMessage = { sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading, user, schedule, smartwatchData, fatigueRisk, expenses]);

  return {
    isAssistantOpen,
    messages,
    isLoading,
    toggleAssistant,
    sendMessage,
  };
};