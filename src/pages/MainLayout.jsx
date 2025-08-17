import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SearchModal from '../components/ui/SearchModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MainLayout = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <AdminHeader onSearchClick={() => setIsSearchOpen(true)} />

            <div className="container mx-auto flex flex-1 w-full px-4 gap-x-8 mt-8">
                <div className="w-auto flex-shrink-0 hidden lg:block">
                    <AdminSidebar />
                </div>

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