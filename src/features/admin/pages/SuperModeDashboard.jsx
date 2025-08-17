// src/features/admin/pages/SuperModeDashboard.jsx
import React from 'react';
import { Crown, Settings, Users, UserCog, DollarSign, Database, Server } from 'lucide-react';
import SettingsCard from '../../../components/ui/SettingsCard';

const SuperModeDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard title="Application Control" icon={Settings}>
            <div className="space-y-3">
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Toggle Maintenance Mode</button>
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Manage Feature Flags</button>
            </div>
        </SettingsCard>
        <SettingsCard title="User Management" icon={Users}>
            <div className="space-y-3">
                <input type="text" placeholder="Search user by email..." className="w-full bg-background p-2 rounded-md border" />
                <button className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20 p-2 rounded-md text-sm font-semibold">Ban User</button>
            </div>
        </SettingsCard>
        <SettingsCard title="Admin & Role Management" icon={UserCog}>
            <div className="space-y-3">
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Create New Admin</button>
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Manage Permissions</button>
            </div>
        </SettingsCard>
        <SettingsCard title="Billing & Subscription" icon={DollarSign}>
            <div className="space-y-3">
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">View Transactions</button>
                <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Issue Refund</button>
            </div>
        </SettingsCard>
        <SettingsCard title="Database Control" icon={Database}>
            <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">Export Full Backup</button>
        </SettingsCard>
        <SettingsCard title="System Control" icon={Server}>
            <button className="w-full bg-muted hover:bg-border p-2 rounded-md text-sm font-semibold">View Sensitive Logs</button>
        </SettingsCard>
    </div>
);

export default SuperModeDashboard;