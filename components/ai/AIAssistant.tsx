import { useState, useCallback, createContext, useContext } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Auth context and types
export const AuthContext = createContext({
  user: null,
  schedule: [],
  smartwatchData: null,
  fatigueRisk: null,
  expenses: [],
});

// Chat message type for AI assistant
export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is not defined. Check .env file and restart server.");
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
            { sender: 'ai', text: `Hello ${user?.name.split(' ')[0] || ''}! I'm Ava, your personal wellness assistant. How can I help you today?` }
        ]);
    }
  }, [messages.length, user]);
  
  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
      
    const context = `
      You are Ava (Aviation Virtual Assistant), a friendly and professional AI health assistant for aviation crew.
      Your goal is to provide helpful, concise, and accurate information based on the user's real-time data.
      Keep your answers brief and to the point.
      
      CURRENT USER DATA:
      - Name: ${user?.name}
      - Role: ${user?.role}
      - High Fatigue Risk Detected: ${fatigueRisk ? 'Yes' : 'No'}
      
      SMARTWATCH DATA:
      - Heart Rate: ${smartwatchData?.heartRate} bpm
      - SpO2: ${smartwatchData?.spO2}%
      - Stress Level: ${smartwatchData?.stressLevel}/10
      - Daily Steps: ${smartwatchData?.dailySteps.current} / ${smartwatchData?.dailySteps.goal}
      - Water Intake: ${smartwatchData?.waterIntake.current}ml / ${smartwatchData?.waterIntake.goal}ml
      
      UPCOMING SCHEDULE (next 3 events):
      ${schedule.slice(0, 3).map(s => `- ${s.title} from ${new Date(s.start).toLocaleString()} to ${new Date(s.end).toLocaleString()}`).join('\n')}

      RECENT EXPENSES (last 3):
      ${expenses.slice(0, 3).map(e => `- ${e.description} for ${e.amount} ${e.currency} on ${e.date}`).join('\n')}

      Answer the following user query based ONLY on the data provided above.
      Do not invent information. If the data is not available, say so.
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
        const errorMessage: ChatMessage = { sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." };
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
function useAuth(): { user: any; schedule: any; smartwatchData: any; fatigueRisk: any; expenses: any; } {
    // Example: Replace with your actual context/provider logic
    const { user, schedule, smartwatchData, fatigueRisk, expenses } = useContext(AuthContext);
    return { user, schedule, smartwatchData, fatigueRisk, expenses };
}
