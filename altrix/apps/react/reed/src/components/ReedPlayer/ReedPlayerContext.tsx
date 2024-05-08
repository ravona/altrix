import React, { createContext } from 'react';
import { ReedPlayerStore, reedPlayerStore } from './mobx/ReedPlayerStore';

export const ReedPlayerContext =
    createContext<ReedPlayerStore>(reedPlayerStore);

export const ReedPlayerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ReedPlayerContext.Provider value={reedPlayerStore}>
            {children}
        </ReedPlayerContext.Provider>
    );
};
