import React, { Dispatch, SetStateAction, createContext } from 'react';
import { Frame, Story } from '../../logic/types/types';
import ourStoriesData from '../../data/stories.json';

interface IReedPlayerContext {
    ourStories: Story[];
    setOurStories: (value: Story[]) => void;
    activeStory: Story | null;
    setActiveStory: (value: Story) => void;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    index: number;
    setIndex: (value: any) => void;
    activeFrame: Frame | null;
    setActiveFrame: (value: Frame | null) => void;
}

export const ReedPlayerContext = createContext<IReedPlayerContext>({
    ourStories: [],
    setOurStories: () => {},
    activeStory: null,
    setActiveStory: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    index: 0,
    setIndex: () => {},
    activeFrame: null,
    setActiveFrame: () => {},
});

export const ReedPlayerProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [ourStories, setOurStories] = React.useState<Story[]>(ourStoriesData);
    const [activeStory, setActiveStory] = React.useState<Story | null>(
        ourStories[0] || null,
    );
    const [activeFrame, setActiveFrame] = React.useState<Frame | null>(null);
    const [index, setIndex] = React.useState<number>(0);
    const [isPlaying, setIsPlaying] = React.useState(false);

    return (
        <ReedPlayerContext.Provider
            value={{
                activeFrame,
                setActiveFrame,
                activeStory,
                index,
                isPlaying,
                ourStories,
                setActiveStory,
                setIndex,
                setIsPlaying,
                setOurStories,
            }}
        >
            {children}
        </ReedPlayerContext.Provider>
    );
};
