// src/features/admin/pages/SecurityDashboard.jsx
import React from 'react';
import { Shield, AlertTriangle, ShieldCheck, ScanEye, Siren, FileLock2, ShieldQuestion } from 'lucide-react';
import DashboardCard from '../../../components/ui/DashboardCard';

const SecurityDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Suspicious Logins" icon={AlertTriangle}>
            <p className="text-sm text-muted-foreground">No unusual login attempts detected in the last 24 hours.</p>
        </DashboardCard>
        <DashboardCard title="Access Control Audit" icon={ShieldCheck}>
            <p className="text-sm text-muted-foreground">All admin activities are within defined permissions.</p>
        </DashboardCard>
        <DashboardCard title="Vulnerability Scans" icon={ScanEye}>
            <p className="text-sm text-green-500">Last scan: 2 hours ago. No vulnerabilities found.</p>
        </DashboardCard>
        <DashboardCard title="Intrusion Detection" icon={Siren}>
            <p className="text-sm text-muted-foreground">System is actively monitoring for threats.</p>
        </DashboardCard>
        <DashboardCard title="Malware Prevention" icon={FileLock2}>
            <p className="text-sm text-muted-foreground">All new file uploads are being scanned.</p>
        </DashboardCard>
        <DashboardCard title="Incident Response" icon={ShieldQuestion}>
            <p className="text-sm text-green-500">Status: All systems operational.</p>
        </DashboardCard>
    </div>
);

export default SecurityDashboard;