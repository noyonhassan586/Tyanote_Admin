import React from 'react';

const SettingsCard = ({ title, icon: Icon, children, className }) => {
    return (
        <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
            {title && (
                <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                    )}
                    <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};

export default SettingsCard;
