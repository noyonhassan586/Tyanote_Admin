import React from 'react';
import TyanoteSpinner from '/Tyanote_Loading_Spinner.svg';

const LoadingSpinner = () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
        <img src={TyanoteSpinner} alt="Tyanote Loading" className="h-24 w-24" />
    </div>
);

export default LoadingSpinner;