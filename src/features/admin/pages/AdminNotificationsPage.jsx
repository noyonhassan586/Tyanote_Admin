// src/features/admin/pages/AdminNotificationsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// --- Mock Data for Admin Notifications ---
const adminNotifications = [
    { id: 1, text: "New high-priority support ticket (#TKT-5821) has been assigned to you.", type: "Support", time: "5m ago", color: "#EF4444", read: false },
    { id: 2, text: "Scheduled database backup completed successfully.", type: "System", time: "1h ago", color: "#22C55E", read: false },
    { id: 3, text: "User 'rahim@example.com' has reported suspicious activity on their account.", type: "Security", time: "3h ago", color: "#F97316", read: true },
    { id: 4, text: "Server CPU usage is high (92%). Please investigate.", type: "Alert", time: "Yesterday", color: "#EF4444", read: true },
    { id: 5, text: "Weekly user engagement report is ready for review.", type: "Analytics", time: "2 days ago", color: "#3B82F6", read: true },
];

const AdminNotificationsPage = () => {
    return (
        <motion.div
            className="max-w-4xl mx-auto"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-4xl font-bold mb-8">
                Admin Notifications
            </h1>

            <motion.div
                className="bg-card border border-border rounded-lg max-h-[80vh] overflow-y-auto scrollbar-hide"
                variants={itemVariants}
            >
                <motion.ul className="divide-y divide-border" variants={listVariants}>
                    {adminNotifications.length > 0 ? (
                        adminNotifications.map(notif => (
                            <motion.li
                                key={notif.id}
                                className={`flex items-center gap-4 p-4 transition-colors ${!notif.read ? 'bg-primary/5' : ''}`}
                                variants={itemVariants}
                            >
                                <div className="flex-shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: notif.color }}></div>
                                <div className="flex-grow">
                                    <p className={`text-card-foreground ${!notif.read ? 'font-semibold' : ''}`}>{notif.text}</p>
                                </div>
                                <div className="flex-shrink-0 text-xs text-muted-foreground text-right w-24">
                                    <p className="font-semibold" style={{ color: notif.color }}>{notif.type}</p>
                                    <p>{notif.time}</p>
                                </div>
                            </motion.li>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground p-10">You have no notifications.</p>
                    )}
                </motion.ul>
            </motion.div>
        </motion.div>
    );
};

export default AdminNotificationsPage;