import React from 'react';
import { Copyright } from 'lucide-react';

const Footer = () => (
    <footer className="w-full bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <span>Copyright</span>
                <Copyright className="w-3 h-3" />
                <span>Tyanem Auth. All rights reserved. (Admin Panel)</span>
            </div>
        </div>
    </footer>
);

export default Footer;