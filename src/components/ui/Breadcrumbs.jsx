import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Helper Hook to detect screen size ---
// Using this hook allows the component to be self-contained and responsive.
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        // Use the newer addEventListener syntax
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

// --- Helper component for the ellipsis separator ---
const EllipsisSeparator = () => (
    <div className="flex items-center space-x-2">
        <ChevronRight className="h-4 w-4 flex-shrink-0" />
        <span className="text-muted-foreground">...</span>
    </div>
);


const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // --- Responsive Breakpoints ---
    const isMobile = useMediaQuery('(max-width: 640px)'); // sm
    const isTablet = useMediaQuery('(max-width: 1024px)'); // lg

    // Don't render breadcrumbs on the root page.
    if (pathnames.length === 0) {
        return null;
    }

    // --- Function to format path names for display ---
    // This keeps the rendering logic cleaner.
    const formatDisplayName = (name) => {
        // Check if the name is a UUID or a long alphanumeric string, display as "Details"
        if (/^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/.test(name) || name.length > 20) {
            return "Details";
        }
        // Capitalize words and replace hyphens
        return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const renderCrumbs = () => {
        let crumbs = [];

        // --- Mobile View: Home Icon > ... > Current Page ---
        if (isMobile && pathnames.length > 1) {
            crumbs.push(<EllipsisSeparator key="ellipsis" />);
            const lastPath = pathnames[pathnames.length - 1];
            crumbs.push(
                <div key={lastPath} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    <span className="font-semibold text-foreground truncate">{formatDisplayName(lastPath)}</span>
                </div>
            );
            // --- Tablet View: Home > First > ... > Second-to-last > Last ---
        } else if (isTablet && pathnames.length > 3) {
            // First item
            const firstPath = pathnames[0];
            crumbs.push(
                <div key={firstPath} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    <Link to={`/${firstPath}`} className="hover:text-primary transition-colors truncate">{formatDisplayName(firstPath)}</Link>
                </div>
            );
            // Ellipsis
            crumbs.push(<EllipsisSeparator key="ellipsis" />);
            // Last two items
            const lastTwoPaths = pathnames.slice(-2);
            lastTwoPaths.forEach((name, index) => {
                const routeTo = `/${pathnames.slice(0, pathnames.length - 1 + index).join('/')}`;
                const isLast = index === lastTwoPaths.length - 1;
                crumbs.push(
                    <div key={name + index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        {isLast ? (
                            <span className="font-semibold text-foreground truncate">{formatDisplayName(name)}</span>
                        ) : (
                            <Link to={routeTo} className="hover:text-primary transition-colors truncate">{formatDisplayName(name)}</Link>
                        )}
                    </div>
                )
            });
            // --- Desktop View or short paths: Show all ---
        } else {
            crumbs = pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const displayName = formatDisplayName(name);

                return (
                    <div key={name + index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        {isLast ? (
                            <span className="font-semibold text-foreground truncate">{displayName}</span>
                        ) : (
                            <Link to={routeTo} className="hover:text-primary transition-colors truncate">{displayName}</Link>
                        )}
                    </div>
                );
            });
        }
        return crumbs;
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 flex items-center flex-wrap gap-y-2 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
        >
            {/* --- Home Link --- */}
            <Link to="/" className="flex items-center gap-2 hover:text-primary transition-colors flex-shrink-0">
                <Home className="w-4 h-4" />
                {/* Hide "Home" text on mobile for a cleaner look */}
                <span className="hidden sm:inline">Home</span>
            </Link>

            {/* --- Dynamically Rendered Crumbs --- */}
            {renderCrumbs()}
        </motion.nav>
    );
};

export default Breadcrumbs;
