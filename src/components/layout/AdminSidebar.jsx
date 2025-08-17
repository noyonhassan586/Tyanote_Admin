import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Crown, Package, Code, LifeBuoy, Megaphone, Trophy, BookOpen, LogOut, Home } from 'lucide-react';
import TyanoteLogo from '/Tyanote_Logo.svg'; // Assuming you have this asset

const Tooltip = ({ text, children }) => (
    <div className="relative group flex items-center">
        {children}
        <span className="absolute left-full ml-4 whitespace-nowrap bg-foreground text-background text-xs font-semibold rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
            {text}
        </span>
    </div>
);

const AdminSidebar = () => {
    const location = useLocation();

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

    return (
        <aside className="sticky top-8">
            <div className="flex flex-col items-center gap-3 bg-card border border-border shadow-lg rounded-full p-2.5">
                <Tooltip text="Dashboard Home">
                    <Link to="/admin" className="block hover:bg-muted rounded-full transition-all duration-200 hover:scale-110">
                        <img src={TyanoteLogo} alt="Tyanote Logo" className="w-10 h-10" />
                    </Link>
                </Tooltip>

                <hr className="w-full border-border/80" />

                {navItems.map(item => {
                    const isActive = location.pathname.startsWith(item.to);
                    return (
                        <Tooltip key={item.to} text={item.label}>
                            <Link to={item.to} className={`${iconButtonBaseClass} ${isActive ? iconButtonActiveClass : iconButtonInActiveClass}`} aria-label={item.label}>
                                <item.icon className="w-5 h-5" />
                            </Link>
                        </Tooltip>
                    );
                })}

                <hr className="w-full border-border/80" />

                <Tooltip text="Logout">
                    <button className={`${iconButtonBaseClass} ${iconButtonInActiveClass} hover:bg-destructive/10 hover:text-destructive`} aria-label="Logout">
                        <LogOut className="w-5 h-5" />
                    </button>
                </Tooltip>
            </div>
        </aside>
    );
};

export default AdminSidebar;