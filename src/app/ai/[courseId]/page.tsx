"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import Container from '~/_components/Container';
import { useAskQuestion, useGetChatHitory, useLoadSubject } from '~/APIs/hooks/useMaterial';
import { useParams } from 'next/navigation';
import Spinner from '~/_components/Spinner';
import { useCourseStore } from '~/APIs/store';

const AiChat = () => {
    const { courseId } = useParams();
    const [question, setQuestion] = useState('');
    
    interface ChatMessage {
        type: 'user' | 'ai' | 'error';
        content: string;
        timestamp?: string;
    }
    
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const { courseRegistrationId } = useCourseStore();

    const { data: historicalChat, isLoading: isLoadingHistory } = useGetChatHitory(courseRegistrationId ?? '');
    console.log(historicalChat);
    
    const { isLoading } = useLoadSubject(courseId as string);
    const { mutate: askQuestion, isPending: isLoadingQuestion } = useAskQuestion();

    // Effect to load historical chat messages
    useEffect(() => {
        if (historicalChat?.data?.content) {
            const formattedHistory = historicalChat.data.content.map((chat: { question: any; askedAt: any; response: string; }) => ([
                // User message
                {
                    type: 'user' as const,
                    content: chat.question,
                    timestamp: chat.askedAt
                },
                // AI response
                {
                    type: 'ai' as const,
                    content: JSON.parse(chat.response).response,
                    timestamp: chat.askedAt
                }
            ])).flat();

            setChatHistory(formattedHistory);
        }
    }, [historicalChat]);

    const handleSendQuestion = () => {
        if (!question.trim()) return;

        // Add user's question to chat
        setChatHistory(prev => [...prev, {
            type: 'user',
            content: question,
            timestamp: new Date().toISOString()
        }]);

        // Call API
        askQuestion({
            courseId: courseId,
            question: question
        }, {
            onSuccess: (response) => {
                // Parse the response string to get the actual response content
                const parsedResponse = JSON.parse(response.response);
                
                // Add AI's response to chat
                setChatHistory(prev => [...prev, {
                    type: 'ai',
                    content: parsedResponse.response,
                    timestamp: response.askedAt
                }]);

                // Clear input
                setQuestion('');
            },
            onError: (error) => {
                setChatHistory(prev => [...prev, {
                    type: 'error',
                    content: 'Sorry, there was an error processing your request.'
                }]);
            }
        });
    };

    const handleKeyPress = (e: { key: string; shiftKey: any; preventDefault: () => void; }) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendQuestion();
        }
    };

    return (
        <Container>
            <div className="h-[800px] flex">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Initial AI Message */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-lg">Hello! How can I assist you today? 👋</p>
                            </div>
                        </div>

                        {/* Loading History Indicator */}
                        {isLoadingHistory && (
                            <Spinner/>
                        )}

                        {/* Chat History */}
                        {chatHistory.map((message, index) => (
                            <div key={index} className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                                {message.type === 'ai' && (
                                    <div className="min-w-8 min-h-8 rounded-full bg-primary flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <div className={`flex flex-col gap-1 ${message.type === 'user' ? 'items-end' : ''}`}>
                                    <div className={`p-3 rounded-lg ${
                                        message.type === 'user' 
                                            ? 'bg-primary text-white' 
                                            : message.type === 'error'
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-gray-100'
                                    }`}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                    {message.timestamp && (
                                        <span className="text-xs text-gray-500">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoadingQuestion && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-gray-500">Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4">
                        <div className="flex items-center gap-2 bg-white rounded-lg border p-2">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Write a message"
                                className="flex-1 outline-none text-sm"
                                disabled={isLoadingQuestion}
                            />
                            <button 
                                className={`p-2 bg-primary rounded-full ${isLoadingQuestion ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
                                onClick={handleSendQuestion}
                                disabled={isLoadingQuestion}
                            >
                                <Send className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AiChat;