// react:
import React, { useEffect, useRef, useState } from 'react';

// # third-party:
import { generateUniqueId } from '@altrix/shared-utils';
import { useMachine } from '@xstate/react';
// ## icons:
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import StopIcon from '@mui/icons-material/Stop';

// types:
import { Story, Frame } from '../../logic/types/types';

// xstate:
import { textPlayerMachine } from './textPlayer.machine';

// logic:
import { regexRules, splitTextWithRegex } from '../../logic/logic';

// data:
import data from '../../data/stories.json';

// styles:
import styles from './TextPlayer.module.scss';

const TextPlayer: React.FC<Story> = (props) => {
    const stories = useRef(data);
    const [currentStory, setCurrentStory] = useState<Story | null>(
        stories ? stories.current[3] : null,
    );
    const [frames, setFrames] = useState<Frame[] | []>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [state, send] = useMachine(textPlayerMachine);

    useEffect(() => {
        if (currentStory) {
            send({ type: 'STOP' });
            const parsedStory = splitTextWithRegex(
                currentStory.content,
                regexRules.sentences,
            );
            const parsedFrames = parsedStory.map((content: string): Frame => {
                return {
                    id: generateUniqueId(),
                    content,
                };
            });
            setFrames(parsedFrames);
        }
    }, [currentStory]);

    useEffect(() => {
        const currentFrame = frames[state.context.index];
        currentFrame?.id &&
            containerRef.current
                ?.querySelector(`#${currentFrame.id}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [state.context.index]);

    return (
        <article className={styles['TextPlayer']}>
            <header className={styles['TextPlayer__Header']}>
                <h2 className={styles['TextPlayer__Title']}>
                    {currentStory?.name}
                </h2>
                <h3 className={styles['TextPlayer__Subtitle']}>
                    Source: {currentStory?.source}
                </h3>
            </header>
            <div className={styles['TextPlayer__Screen']} ref={containerRef}>
                <div className={styles['TextPlayer__Content']}>
                    {frames.map((frame, index) => (
                        <p
                            onClick={() => {
                                send({
                                    type: 'SET_INDEX',
                                    index,
                                });
                            }}
                            key={frame.id}
                            id={frame.id}
                            className={`${styles['TextPlayer__Frame']} ${index === state.context.index ? styles['is-active'] : ''}`}
                        >
                            {frame.content}
                        </p>
                    ))}
                </div>
            </div>
            <footer className={styles['TextPlayer__Footer']}>
                <input
                    className={styles['TextPlayer__Slider']}
                    type="range"
                    min={0}
                    value={state.context.index}
                    onChange={(event) =>
                        send({
                            type: 'SET_INDEX',
                            index: parseInt(event.target.value, 10),
                        })
                    }
                    max={frames.length - 1}
                />

                <div className={styles['TextPlayer__Controls']}>
                    <button
                        className={styles['TextPlayer__Control']}
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
                        className={styles['TextPlayer__Control']}
                        type="button"
                        onClick={() =>
                            send({
                                type: 'SET_INDEX',
                                index: state.context.index + 1,
                            })
                        }
                    >
                        <FastForwardIcon />
                    </button>
                    {state.matches('playing') ? (
                        <>
                            <button
                                className={styles['TextPlayer__Control']}
                                type="button"
                                onClick={() => send({ type: 'PAUSE' })}
                            >
                                <PauseIcon />
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles['TextPlayer__Control']}
                            type="button"
                            onClick={() => send({ type: 'PLAY' })}
                        >
                            <PlayArrowIcon />
                        </button>
                    )}
                    <button
                        className={styles['TextPlayer__Control']}
                        type="button"
                        onClick={() => send({ type: 'STOP' })}
                    >
                        <StopIcon />
                    </button>

                    <button
                        className={styles['TextPlayer__Control']}
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
                    <ol className={styles['TextPlayer__Playlist']}>
                        {stories.current.map((story) => (
                            <li
                                className={styles['TextPlayer__PlaylistItem']}
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

export default TextPlayer;
