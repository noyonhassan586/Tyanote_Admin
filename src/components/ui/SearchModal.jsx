// src/components/ui/SearchModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            setTimeout(() => inputRef.current?.focus(), 100);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        alert(`Searching for: ${query}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    // MODIFICATION: Replaced 'items-start pt-[15vh]' with 'items-center'
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-xl"
                    >
                        <form onSubmit={handleSearch}>
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search Admin Panel... (Press Esc to close)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-card text-foreground rounded-full pl-16 pr-6 py-4 text-lg border-2 border-border focus:outline-none focus:border-primary transition-colors"
                            />
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;