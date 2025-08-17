// src/features/admin/pages/SupportDashboard.jsx
import React from 'react';
import { LifeBuoy, Ticket, Search } from 'lucide-react';
import DashboardCard from '../../../components/ui/DashboardCard';

const SupportDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="Support Tickets" icon={Ticket} className="lg:col-span-2">
            <div className="text-center">
                <p className="text-4xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">New tickets requiring attention</p>
                <button className="mt-4 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
                    View Ticket Queue
                </button>
            </div>
        </DashboardCard>
        <DashboardCard title="Find User" icon={Search}>
            <input type="text" placeholder="Search by email..." className="w-full bg-background p-2 rounded-md border" />
            <button className="mt-3 w-full bg-muted hover:bg-border text-sm font-semibold px-4 py-2 rounded-md">Search</button>
        </DashboardCard>
    </div>
);

export default SupportDashboard;