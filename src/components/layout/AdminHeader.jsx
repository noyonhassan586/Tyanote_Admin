// src/components/layout/AdminHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme'; // Import the new hook

const Tooltip = ({ text, children }) => (
    <div className="relative group flex items-center">
        {children}
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs font-semibold rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            {text}
        </span>
    </div>
);

const AdminHeader = ({ onSearchClick }) => {
    const [theme, setTheme] = useTheme();

    const iconButtonBaseClass = "p-3 rounded-full transition-all duration-200 hover:scale-110";
    const iconButtonInActiveClass = "bg-muted hover:bg-border";

    const iconVariants = {
        hidden: { y: -20, opacity: 0, rotate: -90, scale: 0.5 },
        visible: { y: 0, opacity: 1, rotate: 0, scale: 1 },
        exit: { y: 20, opacity: 0, rotate: 90, scale: 0.5 },
    };

    return (
        <header className="sticky top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-30">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="w-1/4"></div>

                <div className="flex-1 flex justify-center text-lg text-muted-foreground">
                    <Sun className="w-6 h-6 inline-block mr-3 -mt-0.5 text-amber-500" />
                    <span>Welcome to the Tyanote Admin Panel</span>
                </div>

                <div className="w-1/4 flex items-center justify-end gap-2">
                    {/* --- NEW ANIMATED THEME TOGGLE --- */}
                    <Tooltip text={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
                        <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className={`${iconButtonBaseClass} ${iconButtonInActiveClass} w-[44px] h-[44px] flex items-center justify-center overflow-hidden`}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === 'light' ? (
                                    <motion.div
                                        key="sun"
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <Sun className="w-5 h-5 text-foreground" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        variants={iconVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <Moon className="w-5 h-5 text-foreground" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </Tooltip>

                    <Tooltip text="Search">
                        <button onClick={onSearchClick} className={`${iconButtonBaseClass} ${iconButtonInActiveClass}`}>
                            <Search className="w-5 h-5 text-foreground" />
                        </button>
                    </Tooltip>
                    <Tooltip text="Notifications">
                        <Link to="#" className={`${iconButtonBaseClass} relative ${iconButtonInActiveClass}`}>
                            <Bell className="w-5 h-5" />
                        </Link>
                    </Tooltip>
                    <Tooltip text="Admin Profile">
                        <Link to="#" className="p-1.5 rounded-full bg-muted hover:bg-border transition-all duration-200 hover:scale-110">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground text-background">
                                <User className="w-5 h-5" />
                            </span>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;