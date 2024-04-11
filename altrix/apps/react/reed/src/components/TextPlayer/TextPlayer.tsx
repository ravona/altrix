import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Story, TextFrame } from '../../logic/types/types';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import styles from './TextPlayer.module.scss';
import { generateUniqueId } from '@altrix/shared-utils';
import { regexRules } from '../../logic/logic';

const splitTextWithRegex = (text: string, regex: RegExp): string[] =>
    text.split(regex);

const generateTextFrame = (content: string): TextFrame => ({
    id: generateUniqueId(),
    content,
});

const TextPlayer: React.FC<Story> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [textFrames, setTextFrames] = useState<TextFrame[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const parsedFrames = splitTextWithRegex(
            props.content,
            regexRules.sentences,
        ).map(generateTextFrame);
        setTextFrames(parsedFrames);
        setCurrentIndex(0);
    }, [props.content]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % textFrames.length;
                    scrollElementIntoView(textFrames[nextIndex].id);
                    return nextIndex;
                });
            }, 2000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [isPlaying, textFrames]);

    const scrollElementIntoView = useCallback((id: string) => {
        const element = containerRef.current?.querySelector(`#${id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    const handlePlayPause = useCallback(() => {
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleStop = useCallback(() => {
        setIsPlaying(false);
        setCurrentIndex(0);
        scrollElementIntoView(textFrames[0].id);
    }, [textFrames]);

    const handleMoveSlider = useCallback(
        (event: any, newValue: number | number[]) => {
            const newIndex = Array.isArray(newValue) ? newValue[0] : newValue;
            setCurrentIndex(newIndex);
            scrollElementIntoView(textFrames[newIndex].id);
        },
        [textFrames],
    );

    const handleTextFrameClick = useCallback(
        (index: number) => {
            setCurrentIndex(index);
            scrollElementIntoView(textFrames[index].id);
        },
        [textFrames],
    );

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
                    {textFrames.map((frame, index) => (
                        <p
                            key={frame.id}
                            id={frame.id}
                            className={`${styles['TextPlayer__Chunk']} ${index === currentIndex ? styles['is-active'] : ''}`}
                            onClick={() => handleTextFrameClick(index)}
                        >
                            {frame.content}
                        </p>
                    ))}
                </div>
            </div>
            <footer className={styles['TextPlayer__Footer']}>
                <Slider
                    value={currentIndex}
                    onChange={handleMoveSlider}
                    max={textFrames.length - 1}
                />
                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        {isPlaying ? (
                            <Button onClick={handlePlayPause}>
                                <PauseIcon />
                            </Button>
                        ) : (
                            <Button onClick={handlePlayPause}>
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
