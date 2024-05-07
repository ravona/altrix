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
export type PlayerSpeed = 1000 | 2000 | 3000 | 4000 | 5000;
export type PlayerSplitPattern = 'sentences' | 'words';
export type PlayerTheme = 'primary' | 'secondary';

export type PlayerOptions = {
    speed: PlayerSpeed;
    theme: PlayerTheme;
    mode: PlayerMode;
    splitPattern: PlayerSplitPattern;
};
