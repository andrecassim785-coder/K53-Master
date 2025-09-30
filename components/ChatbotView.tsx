
import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { UserIcon, RobotIcon } from './icons/Icons';
import Spinner from './Spinner';

const ChatbotView: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! I'm your K53 AI Tutor. Ask me anything about the learner's or driver's license tests." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseText = await getChatbotResponse(newMessages.slice(0, -1), input);
            setMessages([...newMessages, { role: 'model', text: responseText }]);
        } catch (err) {
            setError("Sorry, I couldn't get a response. Please try again.");
            setMessages(newMessages); // Keep user message even if API fails
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto bg-slate-800 rounded-lg shadow-2xl">
            <h1 className="text-xl font-bold p-4 border-b border-slate-700 text-slate-100">K53 AI Tutor</h1>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <div className="w-8 h-8 flex-shrink-0 bg-brand-blue rounded-full flex items-center justify-center"><RobotIcon className="w-5 h-5 text-white" /></div>}
                        <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-slate-700 text-slate-200'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                         {msg.role === 'user' && <div className="w-8 h-8 flex-shrink-0 bg-slate-600 rounded-full flex items-center justify-center"><UserIcon className="w-5 h-5 text-white" /></div>}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex-shrink-0 bg-brand-blue rounded-full flex items-center justify-center"><RobotIcon className="w-5 h-5 text-white" /></div>
                        <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-200">
                           <Spinner/>
                        </div>
                    </div>
                )}
                 {error && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center"><RobotIcon className="w-5 h-5 text-white" /></div>
                        <div className="max-w-md p-3 rounded-lg bg-red-500/20 text-red-300">
                           <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700">
                <div className="flex items-center bg-slate-700 rounded-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about parallel parking..."
                        className="flex-1 bg-transparent p-3 text-slate-200 placeholder-slate-400 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="p-3 text-slate-300 hover:text-white disabled:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotView;
