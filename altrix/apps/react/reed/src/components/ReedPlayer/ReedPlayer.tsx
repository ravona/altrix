import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SettingsIcon from '@mui/icons-material/Settings';

// react:
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

// types:
import { Story, Frame } from '../../logic/types/types';

// styles:
import styles from './ReedPlayer.module.scss';
import ReedPlayer from '../../logic/ReedPlayer';
import ReedPlayerSlider from './components/ReedPlayerSlider/ReedPlayerSlider';
import ReedPlayerHeader from './components/ReedPlayerHeader/ReedPlayerHeader';
import ReedPlayerContent from './components/ReedPlayerContent/ReedPlayerContent';
import ReedPlayerControls from './components/ReedPlayerControls/ReedPlayerControls';
import ReedPlayerOptions from './components/ReedPlayerOptions/ReedPlayerOptions';
import { ReedPlayerContext } from './ReedPlayerContext';

type Props = {
    stories: Story[];
};

type PlayerMode = 'auto' | 'manual';
type PlayerSpeed = 1000 | 2000 | 3000 | 4000 | 5000;
type PlayerSplitPattern = 'sentence' | 'word';
type PlayerTheme = 'primary' | 'secondary';

type PlayerOptions = {
    speed: PlayerSpeed;
    theme: PlayerTheme;
    mode: PlayerMode;
    splitPattern: PlayerSplitPattern;
};

type PlayerState = {
    story: Story | null;
    frames: Frame[];
    activeFrame: Frame | null;
    isPlaying: boolean;
    playerOptions: PlayerOptions;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const playerRef = useRef<ReedPlayer>(new ReedPlayer(props.stories[0]));
    const containerRef = useRef<HTMLDivElement>(null);

    const [currentStory, setCurrentStory] = useState<Story | null>(
        playerRef.current.getStory(),
    );
    const [frames, setFrames] = useState<Frame[]>([]);
    const [activeFrame, setActiveFrame] = useState<Frame | null>(null);
    const [index, setIndex] = useState<number>(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const [playerOptions, setPlayerOptions] = useState<PlayerOptions>({
        speed: 1000,
        theme: 'primary',
        mode: 'auto',
        splitPattern: 'sentence',
    });

    // toggle options:
    const [showPlayerOptions, setShowPlayerOptions] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    useEffect(() => {
        if (currentStory) {
            const player = new ReedPlayer(currentStory);
            playerRef.current = player;

            setFrames(player.getFrames());
            setIndex(player.getIndex());
            setIsPlaying(player.getIsPlaying());
            setActiveFrame(player.getActiveFrame());
        }
    }, [currentStory]);

    useEffect(() => {
        if (frames.length === 0) return;
        setActiveFrame(frames[index]);
    }, [index]);

    useEffect(() => {
        activeFrame?.id &&
            containerRef.current
                ?.querySelector(`#${activeFrame.id}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [activeFrame]);

    useEffect(() => {
        if (isPlaying) {
            const id = setInterval(handleAutoFrameChange, playerOptions.speed);
            setIntervalId(id);
        } else {
            clearInterval(intervalId as NodeJS.Timeout);
        }
        return () => {
            clearInterval(intervalId as NodeJS.Timeout);
        };
    }, [isPlaying]);

    const handlePause = () => {
        if (!isPlaying) return;
        setIsPlaying(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    const handlePlay = () => {
        if (isPlaying) return;
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setIndex(0);
        if (intervalId) {
            clearInterval(intervalId);
        }
    };

    const handlePrevFrame = () => {
        if (index === 0) return;
        setIndex((prev) => prev - 1);
    };

    const handleNextFrame = () => {
        if (index === frames.length - 1) return;
        setIndex((prev) => prev + 1);
    };

    const handleTogglePlayerOptions = () => {
        setShowPlayerOptions(!showPlayerOptions);
    };

    const handleToggleShowPlaylist = () => {
        setShowPlaylist(!showPlaylist);
    };

    const handleChangeIndex = (i: number) => {
        setIndex(i);
        setActiveFrame(playerRef.current.getFrames()[i]);
    };

    const handleClickFrame = (frame: Frame) => {
        const index = frames.findIndex((f) => f.id === frame.id);
        setIndex(index);
        setActiveFrame(frame);
    };

    const handleAutoFrameChange = () => {
        if (index === frames.length - 1) {
            handleStop();
            return;
        }

        setIndex((prev) => prev + 1);
        setActiveFrame(frames[index]);
        console.log('index', index);
        console.log('active frame', activeFrame?.text);
    };

    const handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        const speed = Number(event.target.value) as PlayerSpeed;
        setPlayerOptions((prev: PlayerOptions) => ({
            ...prev,
            speed: speed,
        }));
    };

    return (
        <ReedPlayerContext.Provider value={{ index, setIndex }}>
            <article className={styles['ReedPlayer']}>
                <ReedPlayerHeader
                    name={currentStory?.name || ''}
                    source={currentStory?.source}
                />
                <div
                    className={styles['ReedPlayer__Screen']}
                    ref={containerRef}
                >
                    <ReedPlayerContent
                        frames={frames}
                        activeFrame={activeFrame}
                        onClickFrame={(frame: Frame) => handleClickFrame(frame)}
                    />
                </div>
                <footer className={styles['ReedPlayer__Footer']}>
                    <ReedPlayerSlider
                        min={0}
                        max={frames.length - 1}
                        value={index}
                        onChange={(i: number) => handleChangeIndex(i)}
                    />

                    <ReedPlayerControls
                        onPrevFrame={handlePrevFrame}
                        onNextFrame={handleNextFrame}
                        isPlaying={isPlaying}
                        onPause={handlePause}
                        onPlay={handlePlay}
                        onStop={handleStop}
                    />

                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={handleTogglePlayerOptions}
                    >
                        <SettingsIcon />
                    </button>

                    {showPlayerOptions && (
                        <ReedPlayerOptions
                            onChangeMode={() => console.log('mode changed')}
                            onChangeSpeed={() => console.log('speed changed')}
                            onChangeTheme={() => console.log('theme changed')}
                        />
                    )}

                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={handleToggleShowPlaylist}
                    >
                        {showPlaylist ? (
                            <PlaylistRemoveIcon />
                        ) : (
                            <PlaylistPlayIcon />
                        )}
                    </button>

                    {showPlaylist && (
                        <ol className={styles['ReedPlayer__Playlist']}>
                            {props.stories.map((story: Story) => (
                                <li
                                    className={
                                        styles['ReedPlayer__PlaylistItem']
                                    }
                                    key={story.id}
                                >
                                    <button
                                        className="button"
                                        type="button"
                                        onClick={() => setCurrentStory(story)}
                                    >
                                        {story.name}
                                    </button>
                                </li>
                            ))}
                        </ol>
                    )}
                </footer>
            </article>
        </ReedPlayerContext.Provider>
    );
};

export default ReedPlayerComponent;
