import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Crown, Package, Code, LifeBuoy, Megaphone, Trophy, BookOpen, LogOut, Home, Search, Bell, User, Sun, Moon } from 'lucide-react';
import TyanoteLogo from '/Tyanote_Logo.svg';

const Tooltip = ({ text, children, side = 'right' }) => (
    <div className="relative group flex items-center">
        {children}
        <span className={`absolute ${side === 'right' ? 'left-full ml-4' : 'top-full mt-2 left-1/2 -translate-x-1/2'} whitespace-nowrap bg-foreground text-background text-xs font-semibold rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50`}>
            {text}
        </span>
    </div>
);

const AdminSidebar = ({ isOpen, setIsOpen, theme, setTheme, onSearchClick }) => {
    const location = useLocation();

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const navItems = [
        { to: '/admin/security', label: 'Security', icon: Shield },
        { to: '/admin/super-mode', label: 'Super Mode', icon: Crown },
        { to: '/admin/product', label: 'Product/Management', icon: Package },
        { to: '/admin/developer', label: 'Technical/Developer', icon: Code },
        { to: '/admin/support', label: 'Customer Support', icon: LifeBuoy },
        { to: '/admin/marketing', label: 'Content/Marketing', icon: Megaphone },
        { to: '/admin/leaderboard', label: 'Leaderboard', icon: Trophy },
        { to: '/admin/learn-and-win', label: 'Learn & Win', icon: BookOpen },
    ];

    const iconButtonBaseClass = "p-3 rounded-full transition-all duration-200 hover:scale-110";
    const iconButtonActiveClass = "bg-primary text-primary-foreground";
    const iconButtonInActiveClass = "bg-muted hover:bg-border";

    const iconVariants = {
        hidden: { y: -20, opacity: 0, rotate: -90, scale: 0.5 },
        visible: { y: 0, opacity: 1, rotate: 0, scale: 1 },
        exit: { y: 20, opacity: 0, rotate: 90, scale: 0.5 },
    };

    const sidebarContent = (
        <div className="flex flex-col items-center gap-3 bg-card border border-border shadow-lg rounded-full p-2.5 h-full lg:h-auto overflow-y-auto overflow-x-hidden">
            <Tooltip text="Dashboard Home">
                <Link to="/admin" className="block hover:bg-muted rounded-full transition-all duration-200 hover:scale-110" onClick={handleLinkClick}>
                    <img src={TyanoteLogo} alt="Tyanote Logo" className="w-10 h-10" />
                </Link>
            </Tooltip>
            <hr className="w-full border-border/80" />
            {navItems.map(item => {
                const isActive = location.pathname.startsWith(item.to);
                return (
                    <Tooltip key={item.to} text={item.label}>
                        <Link to={item.to} className={`${iconButtonBaseClass} ${isActive ? iconButtonActiveClass : iconButtonInActiveClass}`} aria-label={item.label} onClick={handleLinkClick}>
                            <item.icon className="w-5 h-5" />
                        </Link>
                    </Tooltip>
                );
            })}

            {/* --- CONTROLS FOR MOBILE/TABLET --- */}
            <div className="flex flex-col items-center gap-2 lg:hidden">
                <hr className="w-full border-border/80" />
                <Tooltip text={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`} side="top">
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
                <Tooltip text="Search" side="top">
                    <button onClick={() => { onSearchClick(); handleLinkClick(); }} className={`${iconButtonBaseClass} ${iconButtonInActiveClass}`}>
                        <Search className="w-5 h-5 text-foreground" />
                    </button>
                </Tooltip>
                <Tooltip text="Notifications" side="top">
                    <Link to="/admin/notifications" className={`${iconButtonBaseClass} relative ${iconButtonInActiveClass}`} onClick={handleLinkClick}>
                        <Bell className="w-5 h-5" />
                    </Link>
                </Tooltip>
            </div>

            <hr className="w-full border-border/80" />
            <Tooltip text="Logout">
                <button className={`${iconButtonBaseClass} ${iconButtonInActiveClass} hover:bg-destructive/10 hover:text-destructive`} aria-label="Logout" onClick={handleLinkClick}>
                    <LogOut className="w-5 h-5" />
                </button>
            </Tooltip>
        </div>
    );

    return (
        <>
            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="sticky top-8 w-auto flex-shrink-0 hidden lg:block">
                {sidebarContent}
            </aside>

            {/* --- MOBILE SIDEBAR --- */}
            <aside
                className={`fixed top-0 left-0 h-full p-4 z-50 transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {sidebarContent}
            </aside>
        </>
    );
};

export default AdminSidebar;