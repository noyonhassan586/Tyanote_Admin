import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, icon: Icon, children, className = '' }) => {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.08)" }}
            className={`bg-card border border-border rounded-xl p-5 flex flex-col ${className}`}
        >
            <div className="flex items-center gap-3 mb-4">
                {Icon && (
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                )}
                <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
            </div>
            <div className="flex-grow">{children}</div>
        </motion.div>
    );
};

export default DashboardCard;
