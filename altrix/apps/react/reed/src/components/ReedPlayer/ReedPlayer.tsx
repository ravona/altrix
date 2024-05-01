// react:
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

// # third-party:
// ## icons:
// import FastForwardIcon from '@mui/icons-material/FastForward';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import StopIcon from '@mui/icons-material/Stop';

// types:
import { Story, Frame } from '../../logic/types/types';

// styles:
import styles from './ReedPlayer.module.scss';
import ReedPlayer from '../../logic/ReedPlayer';
import ReedPlayerSlider from './components/ReedPlayerSlider/ReedPlayerSlider';

type Props = {
    stories: Story[] | [];
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const playerRef = useRef<ReedPlayer | null>(null);
    const [currentStory, setCurrentStory] = useState<Story | null>(
        props.stories[0],
    );

    const [frames, setFrames] = useState<Frame[]>([]);
    const [activeFrame, setActiveFrame] = useState<Frame | null>(null);
    const [index, setIndex] = useState(0);

    const [delay, setDelay] = useState(1000);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // player options:
    const [showPlaylist, setShowPlaylist] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const onPause = () => {
        if (!isPlaying) return;
        setIsPlaying(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    const onPlay = () => {
        if (isPlaying) return;
        setIsPlaying(true);
    };

    const onStop = () => {
        if (!isPlaying) return;
        setIsPlaying(false);
        clearInterval(intervalId as NodeJS.Timeout);
        setIndex(0);
    };

    useEffect(() => {
        if (currentStory) {
            const player = new ReedPlayer(currentStory);
            playerRef.current = player;
            setFrames(player.getFrames());
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
            const id = setInterval(handleAutoFrameChange, delay);
            setIntervalId(id);
        } else {
            clearInterval(intervalId as NodeJS.Timeout);
        }

        return () => {
            clearInterval(intervalId as NodeJS.Timeout);
        };
    }, [isPlaying, delay]);

    const handleChangeIndex = (i: number) => {
        setActiveFrame(frames[i]);
    };

    const handleAutoFrameChange = () => {
        if (index === frames.length - 1) {
            onPause();
            return;
        }

        setIndex(index + 1);
        setActiveFrame(frames[index]);
        console.log('index', index);
        console.log('active frame', activeFrame?.text);
    };

    const handleChangeDelay = (event: ChangeEvent<HTMLInputElement>) => {
        setDelay(Number(event.target.value));
    };

    return (
        <article className={styles['ReedPlayer']}>
            <header className={styles['ReedPlayer__Header']}>
                <h2 className={styles['ReedPlayer__Title']}>
                    {currentStory?.name}
                </h2>
                <h3 className={styles['ReedPlayer__Subtitle']}>
                    Source: {currentStory?.source}
                </h3>
            </header>
            <div className={styles['ReedPlayer__Screen']} ref={containerRef}>
                <div className={styles['ReedPlayer__Content']}>
                    {frames.map((frame: Frame) => (
                        <p
                            onClick={() => {
                                setActiveFrame(frame);
                            }}
                            key={frame.id}
                            id={frame.id}
                            className={`${styles['ReedPlayer__Frame']} ${activeFrame?.id === frame.id ? styles['is-active'] : ''}`}
                        >
                            {frame.text}
                        </p>
                    ))}
                </div>
            </div>
            <footer className={styles['ReedPlayer__Footer']}>
                <ReedPlayerSlider
                    min={0}
                    max={frames.length - 1}
                    value={frames.findIndex(
                        (frame) => frame.id === activeFrame?.id,
                    )}
                    onChange={(i: number) => handleChangeIndex(i)}
                />

                <div className={styles['ReedPlayer__Controls']}>
                    {/* <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={() =>
                            send({
                                type: 'SET_INDEX',
                                index:
                                    state.context.index === 0
                                        ? 0
                                        : state.context.index - 1,
                            })
                        }
                    >
                        <FastRewindIcon />
                    </button>
                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={() =>
                            send({
                                type: 'SET_INDEX',
                                index: state.context.index + 1,
                            })
                        }
                    >
                        <FastForwardIcon />
                    </button> */}

                    {isPlaying ? (
                        <>
                            <button
                                className={styles['ReedPlayer__Control']}
                                type="button"
                                onClick={() => {
                                    setIsPlaying(false);
                                    onPause();
                                }}
                            >
                                <PauseIcon />
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles['ReedPlayer__Control']}
                            type="button"
                            onClick={() => {
                                setIsPlaying(true);
                                onPlay();
                            }}
                        >
                            <PlayArrowIcon />
                        </button>
                    )}
                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={() => {
                            setIsPlaying(false);
                            setActiveFrame(frames[0]);
                            onStop();
                        }}
                    >
                        <StopIcon />
                    </button>

                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={() => setShowPlaylist(!showPlaylist)}
                    >
                        {showPlaylist ? (
                            <PlaylistRemoveIcon />
                        ) : (
                            <PlaylistPlayIcon />
                        )}
                    </button>
                </div>

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
