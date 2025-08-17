// src/features/admin/pages/ProductDashboard.jsx
import React from 'react';
import { Package, BarChart2, Settings, Newspaper } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import DashboardCard from '../../../components/ui/DashboardCard';

const mockAnalyticsData = [
    { name: 'Jan', users: 400, active: 240 }, { name: 'Feb', users: 300, active: 139 },
    { name: 'Mar', users: 200, active: 980 }, { name: 'Apr', users: 278, active: 390 },
];

const ProductDashboard = () => (
    <div className="space-y-6">
        <DashboardCard title="User Analytics" icon={BarChart2} className="h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalyticsData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                    <Legend />
                    <Bar dataKey="users" fill="hsl(var(--primary))" name="New Users" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="active" fill="hsl(var(--muted-foreground))" name="Active Users" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </DashboardCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard title="Feature Management" icon={Settings}>
                <p className="text-sm text-muted-foreground">Manage A/B tests and feature flags from here.</p>
            </DashboardCard>
            <DashboardCard title="Content Management" icon={Newspaper}>
                <p className="text-sm text-muted-foreground">Create and publish tutorials and guidelines.</p>
            </DashboardCard>
        </div>
    </div>
);

export default ProductDashboard;