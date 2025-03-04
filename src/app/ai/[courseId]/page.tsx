"use client"
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import Container from '~/_components/Container';
import { useAskQuestion, useGetChatHitory, useLoadSubject } from '~/APIs/hooks/useMaterial';
import { useParams } from 'next/navigation';
import Spinner from '~/_components/Spinner';
import { useCourseStore } from '~/APIs/store';

const AiChat = () => {
    const { courseId } = useParams();
    const [question, setQuestion] = useState('');
    const messagesStartRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    interface ChatMessage {
        type: 'user' | 'ai' | 'error';
        content: string;
        timestamp?: string;
    }
    
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const { courseRegistrationId } = useCourseStore();

    const { data: historicalChat, isLoading: isLoadingHistory } = useGetChatHitory(courseRegistrationId ?? '');
    const { isLoading } = useLoadSubject(courseId as string);
    const { mutate: askQuestion, isPending: isLoadingQuestion } = useAskQuestion();

    const scrollToTop = () => {
        messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Effect to handle auto-scrolling to the top (newest messages)
    useEffect(() => {
        scrollToTop();
    }, [chatHistory, isLoadingQuestion]);

    // Effect to load historical chat messages
    useEffect(() => {
        if (historicalChat?.data?.content) {
            const formattedHistory = historicalChat.data.content.map((chat: { question: any; askedAt: any; response: string; }) => ([
                {
                    type: 'user' as const,
                    content: chat.question,
                    timestamp: chat.askedAt
                },
                {
                    type: 'ai' as const,
                    content: JSON.parse(chat.response).response,
                    timestamp: chat.askedAt
                }
            ])).flat();

            // Set history in reverse order
            setChatHistory(formattedHistory.reverse());
        }
    }, [historicalChat]);

    const handleSendQuestion = () => {
        if (!question.trim()) return;

        // Add new messages to the beginning of the array
        setChatHistory(prev => [{
            type: 'user',
            content: question,
            timestamp: new Date().toISOString()
        }, ...prev]);

        askQuestion({
            courseId: courseId,
            question: question
        }, {
            onSuccess: (response) => {
                const parsedResponse = JSON.parse(response.response);
                
                setChatHistory(prev => [{
                    type: 'ai',
                    content: parsedResponse.response,
                    timestamp: response.askedAt
                }, ...prev]);

                setQuestion('');
            },
            onError: (error) => {
                setChatHistory(prev => [{
                    type: 'error',
                    content: 'Sorry, there was an error processing your request.'
                }, ...prev]);
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
                <div className="flex-1 flex flex-col">
                    <div className="border-t p-4">
                        <div className="flex items-center gap-2 bg-bgPrimary rounded-lg border p-2">
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

                    <div 
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth flex flex-col-reverse"
                    >
                        {/* Reference for scrolling to newest messages */}
                        <div ref={messagesStartRef} />
                        
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
                                            : 'bg-bgSecondary'
                                    }`}>
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoadingHistory && (
                            <Spinner/>
                        )}

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-lg">Hello! How can I assist you today? 👋</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AiChat;