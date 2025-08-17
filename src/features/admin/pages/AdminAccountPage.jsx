// src/features/admin/pages/AdminAccountPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Monitor, Plus } from 'lucide-react';
import SettingsCard from '../../../components/ui/SettingsCard';

// --- Animation Variants ---
const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const columnVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Mock Data for Admin ---
const adminProfile = {
    name: "Super Admin",
    email: "superadmin@tyanote.com",
    photoURL: null, // or a URL to a default admin photo
    bio: "Overseeing the Tyanote platform and ensuring smooth operation for all users.",
    role: "Super Administrator"
};

const adminSessions = [
    { _id: "current_session_123", deviceInfo: "Chrome on Windows - Dhaka, BD", loginTime: new Date().toISOString() },
    { _id: "other_session_456", deviceInfo: "Firefox on MacOS - Chittagong, BD", loginTime: new Date(Date.now() - 86400000).toISOString() }, // 1 day ago
];


const AdminAccountPage = () => {
    return (
        <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            {/* --- Left Column --- */}
            <motion.div className="col-span-1 space-y-6" variants={columnVariants}>
                <motion.div variants={cardVariants}>
                    <SettingsCard title="Admin Profile" icon={User}>
                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative group">
                                <img
                                    src={adminProfile.photoURL || `https://placehold.co/128x128/7C3AED/FFFFFF?text=A`}
                                    alt="Admin"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-card shadow-md"
                                />
                                <button className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full p-2 transition-transform transform scale-0 group-hover:scale-100">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="w-full space-y-4 text-center">
                                <p className="text-2xl font-bold">{adminProfile.name}</p>
                                <p className="text-sm text-primary font-semibold bg-primary/10 rounded-full py-1">{adminProfile.role}</p>
                                <p className="text-sm text-muted-foreground bg-muted rounded-md p-2 h-20">{adminProfile.bio}</p>
                            </div>
                            <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-semibold hover:bg-primary/90 transition">
                                Update Profile
                            </button>
                        </div>
                    </SettingsCard>
                </motion.div>
            </motion.div>

            {/* --- Right Column --- */}
            <motion.div className="col-span-1 lg:col-span-2 space-y-6" variants={columnVariants}>
                <motion.div variants={cardVariants}>
                    <SettingsCard title="Account Details" icon={Mail}>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">Email Address</p>
                                    <p className="text-sm text-muted-foreground">{adminProfile.email}</p>
                                </div>
                                <button className="text-sm bg-muted px-3 py-1 rounded-md hover:bg-border">Change</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="font-medium">Password</p>
                                <button className="text-sm bg-muted px-3 py-1 rounded-md hover:bg-border">Change</button>
                            </div>
                        </div>
                    </SettingsCard>
                </motion.div>
                <motion.div variants={cardVariants}>
                    <SettingsCard title="Security" icon={Shield}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Two-Factor Authentication (2FA)</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </SettingsCard>
                </motion.div>
                <motion.div variants={cardVariants}>
                    <SettingsCard title="Device & Login History" icon={Monitor}>
                        <div className="space-y-4">
                            <div className="max-h-64 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
                                {adminSessions.map(session => (
                                    <div key={session._id} className="flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-medium">{session.deviceInfo}</p>
                                            <p className="text-xs text-muted-foreground">Logged in: {new Date(session.loginTime).toLocaleString()}</p>
                                        </div>
                                        {session._id === "current_session_123" ? (
                                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Active now</span>
                                        ) : (
                                            <button className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-md">Logout</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <hr className="border-border" />
                            <button className="w-full bg-destructive text-destructive-foreground py-2 rounded-md text-sm">
                                Logout from all other devices
                            </button>
                        </div>
                    </SettingsCard>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AdminAccountPage;