// src/features/admin/pages/DeveloperDashboard.jsx
import React from 'react';
import { Code, Cpu, HardDrive, Server, Bug, GitBranch } from 'lucide-react';
import DashboardCard from '../../../components/ui/DashboardCard';

const DeveloperDashboard = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard title="CPU Usage" icon={Cpu}>
                <p className="text-4xl font-bold">14%</p>
            </DashboardCard>
            <DashboardCard title="RAM Usage" icon={HardDrive}>
                <p className="text-4xl font-bold">3.2 / 8 GB</p>
            </DashboardCard>
            <DashboardCard title="Database Queries" icon={Server}>
                <p className="text-4xl font-bold">98ms <span className="text-sm text-green-500">avg</span></p>
            </DashboardCard>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Error Tracking" icon={Bug}>
                <p className="text-sm text-muted-foreground">No new critical errors in the last 24 hours.</p>
            </DashboardCard>
            <DashboardCard title="Deployments" icon={GitBranch}>
                <p className="text-sm text-muted-foreground">Last deployment: <strong>main-branch-a4f8d2</strong> (3 hours ago)</p>
            </DashboardCard>
        </div>
    </div>
);

export default DeveloperDashboard;