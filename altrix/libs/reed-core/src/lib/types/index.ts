export type Story = {
    id: string;
    name: string;
    source?: string;
    content: string;
};

export type Frame = {
    id: string;
    text: string;
    img?: string;
};

export type PlayerMode = 'auto' | 'manual';
export type PlayerSpeed = 1 | 2 | 3 | 4 | 5;
export type PlayerSplitPattern = 'sentences' | 'words';
export type PlayerTheme =
    | 'base'
    | 'dark'
    | 'light'
    | 'primary'
    | 'secondary'
    | 'potter';

export type PlayerOptions = {
    mode: PlayerMode;
    speed: PlayerSpeed;
    splitPattern: PlayerSplitPattern;
    theme: PlayerTheme;
};
