import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TextPlayer as TextPlayerClass } from '../../logic/TextPlayer';
import { Story, TextFrame } from '../../logic/types/types';

import styles from './TextPlayer.module.scss';

const TextPlayer: React.FC<Story> = (props) => {
    const [textPlayer, setTextPlayer] = useState<TextPlayerClass | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textPlayer) {
            const myPlayer = new TextPlayerClass(props);
            setTextPlayer(myPlayer);
            debugger;
        }
    }, [props]);

    const handlePlay = () => {
        textPlayer?.play();
    };

    const handlePause = () => {
        textPlayer?.pause();
    };

    const handleStop = () => {
        textPlayer?.stop();
    };

    const scrollElementIntoView = (id: string) => {
        const element = containerRef.current?.querySelector(`#${id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleMoveSlider = (event: Event, newValue: number | number[]) => {
        const currentTextFrame =
            textPlayer?.getTextFrames()[newValue as number];
        if (currentTextFrame) {
            textPlayer?.setCurrentTextFrame(currentTextFrame.id);
            textPlayer?.setCurrentIndex(newValue as number);
        }
    };

    const handleTextFrameClick = (textFrame: TextFrame, i: number) => {
        textPlayer?.setCurrentTextFrame(textFrame.id);
        textPlayer?.setCurrentIndex(i);
        if (textPlayer?.getCurrentTextFrame()) {
            scrollElementIntoView(textPlayer?.getCurrentTextFrame()?.id || '');
        }
    };

    return (
        <article key={props.id} className={styles['TextPlayer']}>
            <header className={styles['TextPlayer__Header']}>
                <h2 className={styles['TextPlayer__Title']}>{props.name}</h2>
                <h3 className={styles['TextPlayer__Subtitle']}>
                    {props.source}
                </h3>
            </header>
            <div className={styles['TextPlayer__Screen']} ref={containerRef}>
                <div className={styles['TextPlayer__Content']}>
                    {textPlayer
                        ?.getTextFrames()
                        ?.map((textFrame: TextFrame, i: number) => (
                            <p
                                id={textFrame.id}
                                key={textFrame.id}
                                onClick={() =>
                                    handleTextFrameClick(textFrame, i)
                                }
                                className={`${styles['TextPlayer__Chunk']} ${textFrame.id === textPlayer.getCurrentTextFrame()?.id ? styles['is-active'] : ''}`}
                            >
                                {textFrame.content}
                            </p>
                        ))}
                </div>
            </div>
            <footer className={styles['TextPlayer__Footer']}>
                <Slider
                    value={textPlayer?.getCurrentIndex() || 0}
                    onChange={handleMoveSlider}
                    max={
                        textPlayer?.getTextFrames()
                            ? textPlayer?.getTextFrames().length - 1
                            : 0
                    }
                />

                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        {textPlayer?.getIsPlaying() ? (
                            <Button onClick={handlePause}>
                                <PauseIcon />
                            </Button>
                        ) : (
                            <Button onClick={handlePlay}>
                                <PlayArrowIcon />
                            </Button>
                        )}

                        <Button onClick={handleStop}>
                            <StopIcon />
                        </Button>
                    </ButtonGroup>
                </div>
            </footer>
        </article>
    );
};

export default TextPlayer;
