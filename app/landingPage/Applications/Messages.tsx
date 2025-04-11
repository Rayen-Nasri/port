"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Message {
    id: number
    text: string
    sender: 'user' | 'other'
    timestamp: string
    status?: 'sending' | 'sent' | 'read'
    reaction?: string
}

interface MessagesProps {
    setActiveApp: (app: 'Settings' | 'Messages' | 'App Store' | 'Photos' | 'Flappy Bird' | 'Notes' | 'Password' | null) => void
}

export const Messages = ({ setActiveApp }: MessagesProps) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Hey there! 👋', sender: 'other', timestamp: '10:00 AM' },
        { id: 2, text: 'Welcome to my portfolio!', sender: 'other', timestamp: '10:01 AM' },
        { id: 3, text: 'Feel free to explore my projects and experiences.', sender: 'other', timestamp: '10:02 AM' },
    ])
    const [newMessage, setNewMessage] = useState('')

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const message: Message = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages([...messages, message])
        setNewMessage('')

        // Simulate response after 1 second
        setTimeout(() => {
            const response: Message = {
                id: messages.length + 2,
                text: 'Thanks for your message! I appreciate your interest.',
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, response])
        }, 1000)
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md bg-white/10 rounded-2xl overflow-hidden backdrop-blur-lg flex flex-col h-[80vh]"
            >
                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white/90">Messages</h2>
                    <button
                        onClick={() => setActiveApp(null)}
                        className="bg-white/10 text-white/90 p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-purple-600' : 'bg-white/10'} rounded-2xl px-4 py-2`}>
                                <p className="text-white/90">{message.text}</p>
                                <p className="text-xs text-white/60 mt-1">{message.timestamp}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <form onSubmit={sendMessage} className="p-4 border-t border-white/10 bg-white/5">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/10 rounded-xl px-4 py-2 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 text-white rounded-xl px-4 py-2 hover:bg-purple-700 transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}