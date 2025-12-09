import React from 'react';
import { motion } from 'framer-motion';
import TyanemLogo from '/Tyanem_Logo.svg';
import TyanoteSpinner from '/Tyanote_Loading_Spinner.svg';

const Preloader = ({ message }) => (
    <motion.div
        className="fixed inset-0 bg-background flex flex-col justify-center items-center z-[100]"
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
        <div className="flex flex-col items-center gap-4">
            <img src={TyanoteSpinner} alt="Tyanote Loading..." className="w-24 h-24" />
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
        <div className="absolute bottom-10 flex items-center gap-2">
            <img src={TyanemLogo} alt="Tyanem Logo" className="w-5 h-5" />
            <p className="text-sm text-muted-foreground italic">Tyanote Admin Dashboard</p>
        </div>
    </motion.div>
);

export default Preloader;