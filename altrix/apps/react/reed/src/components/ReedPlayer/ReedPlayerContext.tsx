import { createContext } from 'react';

interface IReedPlayerContext {
    index: number;
    setIndex: (i: number) => void;
}

export const ReedPlayerContext = createContext<IReedPlayerContext>({
    index: 0,
    setIndex: () => {},
});
