import React, { useState, useRef, useEffect } from 'react';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { PaperAirplaneIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/solid';

const AIAssistant: React.FC = () => {
    const { isAssistantOpen, messages, isLoading, toggleAssistant, sendMessage } = useAIAssistant();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (message: string) => {
        if (message.trim()) {
            sendMessage(message);
            setInput('');
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend(input);
    };
    
    const quickActions = [
        "Check my fatigue risk",
        "Am I hydrated?",
        "What's my next flight?",
    ];

    if (!isAssistantOpen) {
        return (
            <button
                onClick={toggleAssistant}
                className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 h-16 w-16 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-transform hover:scale-110 z-40"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="h-8 w-8" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 w-[calc(100%-2rem)] max-w-sm h-[70%] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-2xl">
                <div className="flex items-center">
                    <SparklesIcon className="h-6 w-6 text-indigo-500" />
                    <h3 className="ml-2 text-lg font-bold text-gray-900">Ava</h3>
                </div>
                <button onClick={toggleAssistant} className="p-1 rounded-full hover:bg-gray-200">
                    <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><SparklesIcon className="h-4 w-4 text-indigo-500"/></div>}
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.sender === 'user' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-2">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><SparklesIcon className="h-4 w-4 text-indigo-500"/></div>
                        <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-800 rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t bg-white rounded-b-2xl">
                {messages.length <= 1 && (
                     <div className="flex flex-wrap gap-2 mb-3">
                        {quickActions.map(action => (
                            <button key={action} onClick={() => handleSend(action)} className="px-3 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100">
                                {action}
                            </button>
                        ))}
                    </div>
                )}
                <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Ava anything..."
                        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-1 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="h-10 w-10 bg-indigo-500 text-white rounded-full flex-shrink-0 flex items-center justify-center disabled:bg-gray-300">
                        <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAssistant;