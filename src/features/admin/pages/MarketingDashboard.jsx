// src/features/admin/pages/MarketingDashboard.jsx
import React from 'react';
import { Megaphone, Mail, MessageSquare } from 'lucide-react';
import DashboardCard from '../../../components/ui/DashboardCard';

const MarketingDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Email Campaigns" icon={Mail}>
            <button className="w-full bg-primary text-primary-foreground p-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition">
                Create New Campaign
            </button>
        </DashboardCard>
        <DashboardCard title="In-App Announcements" icon={MessageSquare}>
            <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold transition">
                Publish Announcement
            </button>
        </DashboardCard>
    </div>
);

export default MarketingDashboard;