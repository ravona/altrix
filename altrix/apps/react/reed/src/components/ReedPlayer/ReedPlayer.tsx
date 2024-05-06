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
    story: Story;
    frames: Frame[];
    activeFrame: Frame;
    isPlaying: boolean;
    playerOptions: PlayerOptions;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const playerRef = useRef<ReedPlayer>(new ReedPlayer(props.stories[0]));
    const [currentStory, setCurrentStory] = useState<Story | null>(null);
    const [frames, setFrames] = useState<Frame[] | []>([]);
    const [activeFrame, setActiveFrame] = useState<Frame | null>(null);
    const [index, setIndex] = useState<number>(0);

    const [playerSpeed, setPlayerSpeed] = useState<number>(1000);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // player options:
    const [showPlayerOptions, setShowPlayerOptions] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currentStory) {
            const player = new ReedPlayer(currentStory);
            playerRef.current = player;

            setFrames(player.getFrames());
            setIndex(player.getIndex());
            setActiveFrame(player.getActiveFrame());
        }
    }, [currentStory]);

    useEffect(() => {
        activeFrame?.id &&
            containerRef.current
                ?.querySelector(`#${activeFrame.id}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [activeFrame]);

    useEffect(() => {
        if (isPlaying) {
            const id = setInterval(handleAutoFrameChange, playerSpeed);
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
        playerRef.current?.play();
    };

    const handleStop = () => {
        if (!isPlaying) return;
        setIsPlaying(false);
        setIndex(0);
    };

    const handlePrevFrame = () => {
        if (index === 0) return;
        setIndex(index - 1);
        // setActiveFrame(frames[index]);
    };

    const handleNextFrame = () => {
        if (index === frames.length - 1) return;
        setIndex(index + 1);
        // setActiveFrame(frames[index]);
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

    const handleAutoFrameChange = () => {
        if (index === frames.length - 1) {
            handlePause();

            return;
        }

        setIndex(index + 1);
        // setActiveFrame(frames[index]);
        console.log('index', index);
        console.log('active frame', activeFrame?.text);
    };

    const handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerSpeed(Number(event.target.value));
    };

    return (
        <article className={styles['ReedPlayer']}>
            <ReedPlayerHeader
                name={currentStory?.name || ''}
                source={currentStory?.source}
            />
            <div className={styles['ReedPlayer__Screen']} ref={containerRef}>
                <ReedPlayerContent
                    frames={playerRef.current.getFrames() || []}
                    activeFrame={
                        playerRef.current?.getActiveFrame() || ({} as Frame)
                    }
                    onClickFrame={(frame: Frame) => setActiveFrame(frame)}
                />
            </div>
            <footer className={styles['ReedPlayer__Footer']}>
                <ReedPlayerSlider
                    min={0}
                    max={playerRef.current?.getFrames().length ?? 0}
                    value={playerRef.current?.getIndex() ?? 0}
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
                                className={styles['ReedPlayer__PlaylistItem']}
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
    );
};

export default ReedPlayerComponent;
