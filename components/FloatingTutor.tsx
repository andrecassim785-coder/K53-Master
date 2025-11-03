import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ChatIcon, CloseIcon, RobotIcon } from './icons/Icons';
import Spinner from './Spinner';

const FloatingTutor: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! How can I help you with your K53 preparation today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-slate-800 w-80 sm:w-96 h-[28rem] rounded-lg shadow-2xl flex flex-col mb-4 transition-all duration-300 ease-out transform origin-bottom-right animate-pop-in">
                    <header className="flex items-center justify-between p-3 border-b border-slate-700 flex-shrink-0">
                        <h2 className="text-md font-bold text-slate-100 flex items-center gap-2">
                            <RobotIcon className="w-5 h-5 text-brand-green" />
                            AI Tutor
                        </h2>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((msg, index) => (
                             <div key={index} className={`flex items-start gap-2 text-sm ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'model' && <div className="w-6 h-6 flex-shrink-0 bg-brand-blue rounded-full flex items-center justify-center"><RobotIcon className="w-4 h-4 text-white" /></div>}
                                <div className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-slate-700 text-slate-200'}`}>
                                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-2 text-sm">
                                <div className="w-6 h-6 flex-shrink-0 bg-brand-blue rounded-full flex items-center justify-center"><RobotIcon className="w-4 h-4 text-white" /></div>
                                <div className="p-2 rounded-lg bg-slate-700 text-slate-200">
                                   <Spinner/>
                                </div>
                            </div>
                        )}
                         {error && (
                            <div className="flex items-start gap-2 text-sm">
                                <div className="p-2 rounded-lg bg-red-500/20 text-red-300">
                                   <p>{error}</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-2 border-t border-slate-700 flex-shrink-0">
                        <div className="flex items-center bg-slate-700 rounded-md">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-transparent p-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-2 text-slate-300 hover:text-white disabled:text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-brand-blue hover:bg-brand-green text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-brand-light"
                aria-label={isOpen ? "Close AI Tutor" : "Open AI Tutor"}
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
            </button>
        </div>
    );
};

export default FloatingTutor;
