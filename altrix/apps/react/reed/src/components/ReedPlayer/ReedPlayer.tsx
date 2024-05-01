// react:
import React, { useEffect, useRef, useState } from 'react';

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

type Props = {
    stories: Story[] | [];
    onPause: () => void;
    onPlay: () => void;
    onSelectFrame: (id: string) => void;
    onStop: () => void;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const playerRef = useRef<ReedPlayer | null>(null);
    const [currentStory, setCurrentStory] = useState<Story | null>(
        props.stories[0],
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const [frames, setFrames] = useState<Frame[]>([]);
    const [activeFrame, setActiveFrame] = useState<Frame | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showPlaylist, setShowPlaylist] = useState(false);

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

    const handleChangeIndex = (i: number) => {
        setActiveFrame(frames[i]);
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
                    {playerRef.current?.getFrames().map((frame: Frame) => (
                        <p
                            onClick={() => {
                                setActiveFrame(frame);
                                props.onSelectFrame(frame.id);
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
                <input
                    className={styles['ReedPlayer__Slider']}
                    type="range"
                    min={0}
                    value={frames.findIndex(
                        (frame) => frame.id === activeFrame?.id,
                    )}
                    onChange={(event) => {
                        const newIndex = parseInt(event.target.value, 10);
                        handleChangeIndex(newIndex);
                    }}
                    max={frames.length - 1}
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
                            }}
                        >
                            <PlayArrowIcon />
                        </button>
                    )}
                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={props.onStop}
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
