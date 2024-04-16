import { generateUniqueId } from '@altrix/shared-utils';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { useMachine } from '@xstate/react';
import React, { useEffect, useRef, useState } from 'react';
import data from '../../data/stories.json';
import { regexRules, splitTextWithRegex } from '../../logic/logic';
import { Story, TextFrame } from '../../logic/types/types';
import styles from './TextPlayer.module.scss';
import { textPlayerMachine } from './textPlayer.machine';

const TextPlayer: React.FC<Story> = (props) => {
    const stories = useRef(data);
    const [currentStory, setCurrentStory] = useState<Story | null>(
        stories ? stories.current[3] : null,
    );
    const [frames, setFrames] = useState<TextFrame[] | []>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [state, send] = useMachine(textPlayerMachine);
    const [showPlaylist, setShowPlaylist] = useState(false);

    useEffect(() => {
        if (currentStory) {
            send({ type: 'STOP' });
            const parsedStory = splitTextWithRegex(
                currentStory.content,
                regexRules.sentences,
            );
            const parsedFrames = parsedStory.map(
                (content: string): TextFrame => {
                    return {
                        id: generateUniqueId(),
                        content,
                    };
                },
            );
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
                    {currentStory?.source}
                </h3>
            </header>
            <div className={styles['TextPlayer__Screen']} ref={containerRef}>
                <div className={styles['TextPlayer__Content']}>
                    {frames.map((frame, index) => (
                        <p
                            onClick={() => {
                                send({ type: 'SET_INDEX', index });
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
                <Slider
                    value={state.context.index}
                    onChange={(_, value) =>
                        send({ type: 'SET_INDEX', index: value as number })
                    }
                    max={frames.length - 1}
                />

                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup
                        variant="text"
                        aria-label="Text player controls"
                    >
                        <Button
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
                        </Button>
                        <Button
                            onClick={() =>
                                send({
                                    type: 'SET_INDEX',
                                    index: state.context.index + 1,
                                })
                            }
                        >
                            <FastForwardIcon />
                        </Button>
                        {state.matches('playing') ? (
                            <>
                                <Button
                                    onClick={() =>
                                        send({
                                            type: 'PAUSE',
                                        })
                                    }
                                >
                                    <PauseIcon />
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => send({ type: 'PLAY' })}>
                                <PlayArrowIcon />
                            </Button>
                        )}
                        <Button onClick={() => send({ type: 'STOP' })}>
                            <StopIcon />
                        </Button>

                        <Button onClick={() => setShowPlaylist(!showPlaylist)}>
                            {showPlaylist ? (
                                <PlaylistRemoveIcon />
                            ) : (
                                <PlaylistPlayIcon />
                            )}
                        </Button>
                    </ButtonGroup>
                </div>
            </footer>
            <div>
                {showPlaylist &&
                    stories.current.map((story) => (
                        <div onClick={() => setCurrentStory(story)}>
                            {story.name}
                        </div>
                    ))}
            </div>
        </article>
    );
};

export default TextPlayer;
