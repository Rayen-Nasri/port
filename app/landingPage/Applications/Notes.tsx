"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiPlus, FiX, FiTrash2 } from 'react-icons/fi'

interface Note {
    id: number
    title: string
    content: string
    color: string
    date: string
}

interface NotesProps {
    setActiveApp: (app: 'Settings' | 'Messages' | 'App Store' | 'Photos' | 'Flappy Bird' | 'Notes' | null) => void
}

export const Notes = ({ setActiveApp }: NotesProps) => {
    const [notes, setNotes] = useState<Note[]>([])
    const [showNewNote, setShowNewNote] = useState(false)
    const [newNote, setNewNote] = useState({ title: '', content: '' })

    const colors = [
        'bg-gradient-to-br from-purple-600/60 to-purple-800/60',
        'bg-gradient-to-br from-blue-600/60 to-blue-800/60',
        'bg-gradient-to-br from-pink-600/60 to-pink-800/60',
        'bg-gradient-to-br from-indigo-600/60 to-indigo-800/60'
    ]

    useEffect(() => {
        const savedNotes = localStorage.getItem('portfolioNotes')
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes))
        } else {
            // Set default welcome note
            const defaultNote = {
                id: 1,
                title: 'Welcome to My Portfolio',
                content: 'Thanks for visiting! Feel free to explore my projects and experiences.',
                color: 'bg-purple-600/50',
                date: new Date().toLocaleDateString()
            }
            setNotes([defaultNote])
            localStorage.setItem('portfolioNotes', JSON.stringify([defaultNote]))
        }
    }, [])

    const addNote = () => {
        if (!newNote.title.trim() && !newNote.content.trim()) return

        const note: Note = {
            id: Date.now(), // Use timestamp for unique ID
            title: newNote.title || 'Untitled',
            content: newNote.content,
            color: colors[Math.floor(Math.random() * colors.length)],
            date: new Date().toLocaleDateString()
        }

        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        localStorage.setItem('portfolioNotes', JSON.stringify(updatedNotes))
        setNewNote({ title: '', content: '' })
        setShowNewNote(false)
    }

    const deleteNote = (id: number) => {
        const updatedNotes = notes.filter(note => note.id !== id)
        setNotes(updatedNotes)
        localStorage.setItem('portfolioNotes', JSON.stringify(updatedNotes))
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-40">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="w-full max-w-4xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-lg relative shadow-xl border border-white/10"
            >
                <div className="flex justify-between items-center mb-8">
                    <motion.h2 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-3xl font-bold text-white/90 bg-clip-text  bg-gradient-to-r from-white to-white/70"
                    >
                        Notes
                    </motion.h2>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowNewNote(true)}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-4 py-2 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-900/20"
                        >
                            <FiPlus className="h-4 w-4" />
                            <span>New Note</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            onClick={() => setActiveApp(null)}
                            className="bg-white/10 text-white/90 p-2 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 shadow-lg"
                        >
                            <FiX className="h-6 w-6" />
                        </motion.button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note, index) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.9 }}
                            transition={{ 
                                duration: 0.3, 
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{ 
                                y: -5, 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className={`${note.color} rounded-xl p-5 relative group shadow-lg backdrop-blur-sm border border-white/10`}
                        >
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteNote(note.id)}
                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/20 p-1.5 rounded-full hover:bg-black/40"
                            >
                                <FiTrash2 className="h-4 w-4 text-white/90" />
                            </motion.button>
                            <h3 className="text-xl font-bold text-white/95 mb-3">{note.title}</h3>
                            <p className="text-white/80 text-sm mb-4 line-clamp-3">{note.content}</p>
                            <p className="text-white/60 text-xs font-medium">{note.date}</p>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {showNewNote && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
                            onClick={() => setShowNewNote(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="bg-black/10 rounded-2xl p-6 w-full max-w-md backdrop-blur-lg shadow-xl border border-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-white/95">New Note</h3>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowNewNote(false)}
                                        className="text-white/70 hover:text-white/90 transition-colors"
                                    >
                                        <FiX className="h-5 w-5" />
                                    </motion.button>
                                </div>
                                
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10 shadow-inner"
                                />
                                <textarea
                                    placeholder="Content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/50 mb-6 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/10 shadow-inner"
                                />
                                <div className="flex space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={addNote}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-4 py-3 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg shadow-purple-900/20"
                                    >
                                        Add Note
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setShowNewNote(false)}
                                        className="flex-1 bg-white/10 text-white/90 rounded-xl px-4 py-3 hover:bg-white/20 transition-all duration-300 border border-white/10"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}