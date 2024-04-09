import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { Button, ButtonGroup, Slider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TextPlayer as TextPlayerClass } from '../../logic/TextPlayer';
import { Story } from '../../logic/types/types';

import styles from './TextPlayer.module.scss';

const TextPlayer: React.FC<Story> = (props) => {
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [content, setContent] = useState<string[]>([]);
    const textPlayer = useRef<TextPlayerClass | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        textPlayer.current = new TextPlayerClass(props, (index, isPlaying) => {
            setIndex(index);
            setIsPlaying(isPlaying);
            scrollChunkIntoView(index);
        });
        setContent(textPlayer.current?.content || []);
    }, [props]);

    const handlePlay = () => {
        textPlayer.current?.play();
    };

    const handlePause = () => {
        textPlayer.current?.pause();
    };

    const handleStop = () => {
        textPlayer.current?.stop();
    };

    const handleSeek = (event: Event, newValue: number | number[]) => {
        textPlayer.current?.seek(newValue as number);
        scrollChunkIntoView(newValue as number);
    };

    const scrollChunkIntoView = (index: number) => {
        const element = containerRef.current?.querySelector(
            `.${styles['TextPlayer__Chunk']}:nth-child(${index + 1})`,
        );
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleChunkClick = (chunkIndex: number) => {
        setIndex(chunkIndex);
        textPlayer.current?.seek(chunkIndex);
        scrollChunkIntoView(chunkIndex);
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
                    {content?.map((chunk: string, i: number) => (
                        <p
                            key={i}
                            onClick={() => handleChunkClick(i)}
                            className={`${styles['TextPlayer__Chunk']} ${i === index ? styles['is-active'] : ''}`}
                        >
                            {chunk}
                        </p>
                    ))}
                </div>
            </div>

            <footer className={styles['TextPlayer__Footer']}>
                <Slider
                    value={index}
                    onChange={handleSeek}
                    max={
                        textPlayer.current?.content.length
                            ? textPlayer.current.content.length - 1
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
