import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext<any>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeButton, setActiveButton] = useState('');

    return (
        <NavigationContext.Provider value={{ activeButton, setActiveButton }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    return useContext(NavigationContext);
};
