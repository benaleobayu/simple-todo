// context/AlertContext.tsx
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlertContextProps {
    alertMsg: string;
    setAlertMsg: (msg: string) => void;
    codeMsg: number | null;
    setCodeMsg: (code: number | null) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [codeMsg, setCodeMsg] = useState<number | null>(null);

    return (
        <AlertContext.Provider value={{ alertMsg, setAlertMsg, codeMsg, setCodeMsg }}>
            {children}
        </AlertContext.Provider>
    );
};