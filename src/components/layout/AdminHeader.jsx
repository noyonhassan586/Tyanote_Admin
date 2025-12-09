import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Sun, Moon } from 'lucide-react';
import TyanemLogo from '/Tyanem_Logo.svg';

const Tooltip = ({ text, children }) => (
    <div className="relative group flex items-center">
        {children}
        <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs font-semibold rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            {text}
        </span>
    </div>
);

const AdminHeader = ({ onSearchClick, theme, setTheme, setSidebarOpen }) => {
    const iconButtonBaseClass = "p-3 rounded-full transition-all duration-200 hover:scale-110";
    const iconButtonInActiveClass = "bg-muted hover:bg-border";

    const iconVariants = {
        hidden: { y: -20, opacity: 0, rotate: -90, scale: 0.5 },
        visible: { y: 0, opacity: 1, rotate: 0, scale: 1 },
        exit: { y: 20, opacity: 0, rotate: 90, scale: 0.5 },
    };

    return (
        <header className="sticky top-0 w-full bg-background/80 backdrop-blur-sm border-border z-30">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* --- Left Side --- */}
                <div className="w-1/4 flex justify-start">
                    {/* Hamburger Menu (Mobile/Tablet) */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 space-y-1.5"
                        aria-label="Open menu"
                    >
                        <span className="block w-6 h-0.5 bg-[#386641] rounded-full"></span>
                        <span className="block w-6 h-0.5 bg-[#F97A00] rounded-full"></span>
                        <span className="block w-6 h-0.5 bg-[#071952] rounded-full"></span>
                        <span className="block w-6 h-0.5 bg-[#0B666A] rounded-full"></span>
                    </button>

                    {/* Logo and Title (Desktop) */}
                    <Link to="/admin" className="hidden lg:flex items-center gap-3">
                        <img src={TyanemLogo} alt="Tyanem Logo" className="w-10 h-10" />
                    </Link>
                </div>

                {/* --- Center: Logo and Title (Mobile/Tablet) --- */}
                <div className="flex-1 flex justify-center items-center lg:hidden">
                    <Link to="/admin" className="flex items-center gap-3">
                        <img src={TyanemLogo} alt="Tyanem Logo" className="w-10 h-10" />
                    </Link>
                </div>

                {/* --- Right Side: Controls --- */}
                <div className="w-1/4 flex items-center justify-end gap-2">
                    {/* Desktop Controls */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Tooltip text={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
                            <button
                                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                className={`${iconButtonBaseClass} ${iconButtonInActiveClass} w-[44px] h-[44px] flex items-center justify-center overflow-hidden`}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {theme === 'light' ? (
                                        <motion.div key="sun" variants={iconVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>
                                            <Sun className="w-5 h-5 text-foreground" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon" variants={iconVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>
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
                            <Link to="/admin/notifications" className={`${iconButtonBaseClass} relative ${iconButtonInActiveClass}`}>
                                <Bell className="w-5 h-5" />
                            </Link>
                        </Tooltip>
                        <Tooltip text="Admin Profile">
                            <Link to="/admin/account" className="p-1.5 rounded-full bg-muted hover:bg-border transition-all duration-200 hover:scale-110">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground text-background">
                                    <User className="w-5 h-5" />
                                </span>
                            </Link>
                        </Tooltip>
                    </div>

                    {/* User Icon (Mobile/Tablet) */}
                    <Link to="/admin/account" className="lg:hidden p-1.5 rounded-full bg-muted hover:bg-border transition-all duration-200 hover:scale-110">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted-foreground text-background">
                            <User className="w-5 h-5" />
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;