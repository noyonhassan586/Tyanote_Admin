import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SearchModal from '../components/ui/SearchModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useTheme } from '../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useTheme();

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <AdminHeader
                onSearchClick={handleSearchClick}
                theme={theme}
                setTheme={setTheme}
                setSidebarOpen={setIsSidebarOpen}
            />

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            <div className="container mx-auto flex flex-1 w-full px-4 gap-x-8 mt-8">
                <AdminSidebar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    theme={theme}
                    setTheme={setTheme}
                    onSearchClick={handleSearchClick}
                />

                <main className="flex-1 min-w-0">
                    <Breadcrumbs />
                    <Suspense fallback={<LoadingSpinner />}>
                        <Outlet />
                    </Suspense>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;