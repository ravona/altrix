import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { useMachine } from '@xstate/react';
import React, { useEffect, useRef, useState } from 'react';
import { TextPlayer as TextPlayerClass } from '../../logic/TextPlayer';
import { Story } from '../../logic/types/types';
import styles from './TextPlayer.module.scss';
import { textPlayerMachine } from './textPlayer.machine';

const TextPlayer: React.FC<Story> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [state, send] = useMachine(textPlayerMachine);
    const [textPlayer, setTextPlayer] = useState(
        () => new TextPlayerClass(props),
    );

    useEffect(() => {
        const currentFrame = textPlayer.getTextFrames()[state.context.index];
        currentFrame?.id &&
            containerRef.current
                ?.querySelector(`#${currentFrame.id}`)
                ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
    }, [state.context.index, textPlayer]);

    return (
        <article className={styles['TextPlayer']}>
            <header className={styles['TextPlayer__Header']}>
                <h2 className={styles['TextPlayer__Title']}>{props.name}</h2>
                <h3 className={styles['TextPlayer__Subtitle']}>
                    {props.source}
                </h3>
            </header>
            <div className={styles['TextPlayer__Screen']} ref={containerRef}>
                <div className={styles['TextPlayer__Content']}>
                    {textPlayer.getTextFrames().map((frame, index) => (
                        <p
                            onClick={() => send({ type: 'SET_INDEX', index })}
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
                    max={textPlayer.getTextFrames().length - 1}
                />

                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup
                        variant="text"
                        aria-label="Text player controls"
                    >
                        {state.matches('playing') ? (
                            <Button onClick={() => send({ type: 'PAUSE' })}>
                                <PauseIcon />
                            </Button>
                        ) : (
                            <Button onClick={() => send({ type: 'PLAY' })}>
                                <PlayArrowIcon />
                            </Button>
                        )}
                        <Button onClick={() => send({ type: 'STOP' })}>
                            <StopIcon />
                        </Button>
                    </ButtonGroup>
                </div>
            </footer>
        </article>
    );
};

export default TextPlayer;
