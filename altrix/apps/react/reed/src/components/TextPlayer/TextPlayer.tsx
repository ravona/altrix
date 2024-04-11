import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TextPlayer as TextPlayerClass } from '../../logic/TextPlayer';
import { Story, TextFrame } from '../../logic/types/types';

import styles from './TextPlayer.module.scss';

const TextPlayer: React.FC<Story> = (props) => {
    const textPlayer = useRef<TextPlayerClass | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // ui state:
    const [currentTextFrame, setCurrentTextFrame] = useState<TextFrame | null>(
        null,
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!textPlayer.current) {
            textPlayer.current = new TextPlayerClass(props);
            setCurrentTextFrame(textPlayer.current.getCurrentTextFrame());
            setCurrentIndex(textPlayer.current.getCurrentIndex());
        }
    }, [props]);

    const handlePlay = () => {
        setIsPlaying(true);
        textPlayer.current?.play();
    };

    const handlePause = () => {
        setIsPlaying(false);
        textPlayer.current?.pause();
    };

    const handleStop = () => {
        setCurrentIndex(0);
        textPlayer.current?.setCurrentTextFrame;
        if (textPlayer.current?.getCurrentTextFrame()) {
            setCurrentTextFrame(textPlayer.current?.getTextFrames()[0]);
        }
        textPlayer.current?.stop();
    };

    const scrollElementIntoView = (id: string) => {
        const element = containerRef.current?.querySelector(`#${id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleMoveSlider = (event: Event, newValue: number | number[]) => {
        const newFrame =
            textPlayer.current?.getTextFrames()[newValue as number];

        if (newFrame) {
            textPlayer.current?.setCurrentTextFrame(newFrame.id);
            textPlayer.current?.setCurrentIndex(newValue as number);
            setCurrentTextFrame(newFrame);
            setCurrentIndex(newValue as number);
            scrollElementIntoView(newFrame.id);
        }
    };

    const handleTextFrameClick = (textFrame: TextFrame, i: number) => {
        textPlayer.current?.setCurrentTextFrame(textFrame.id);
        textPlayer.current?.setCurrentIndex(i);
        setCurrentTextFrame(textFrame);
        scrollElementIntoView(textFrame.id);
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
                    {textPlayer.current
                        ?.getTextFrames()
                        ?.map((textFrame: TextFrame, i: number) => (
                            <p
                                id={textFrame.id}
                                key={textFrame.id}
                                onClick={() =>
                                    handleTextFrameClick(textFrame, i)
                                }
                                className={`${styles['TextPlayer__Chunk']} ${textFrame.id === currentTextFrame?.id ? styles['is-active'] : ''}`}
                            >
                                {textFrame.content}
                            </p>
                        ))}
                </div>
            </div>
            <footer className={styles['TextPlayer__Footer']}>
                <Slider
                    value={currentIndex}
                    onChange={handleMoveSlider}
                    max={
                        textPlayer.current?.getTextFrames()
                            ? textPlayer.current?.getTextFrames().length - 1
                            : 0
                    }
                />

                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        {isPlaying ? (
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
