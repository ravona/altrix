import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Chunk, Story } from '../../logic/types/types';
import { textPlayerStore } from '../../mobx/text-player.store';

import styles from './TextPlayer.module.scss';
import { autorun } from 'mobx';

const TextPlayer: React.FC<Story> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const disposer = autorun(() => {
            const currentIndex = textPlayerStore.index;
            const currentChunkId = textPlayerStore.content[currentIndex]?.id;
            if (currentChunkId) {
                scrollChunkIntoView(currentChunkId);
            }
        });

        return () => disposer();
    }, []);

    const handleMoveSlider = (event: any, newValue: number | number[]) => {
        const newIndex = Array.isArray(newValue) ? newValue[0] : newValue;
        textPlayerStore.setIndex(newIndex);
    };

    const scrollChunkIntoView = (id: string) => {
        const element = containerRef.current?.querySelector(`#${id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleChunkClick = (id: string) => {
        textPlayerStore.setIndex(
            textPlayerStore.content.findIndex((chunk) => chunk.id === id),
        );
        scrollChunkIntoView(id);
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
                    {textPlayerStore.content?.map((chunk: Chunk, i: number) => (
                        <p
                            id={chunk.id}
                            key={chunk.id}
                            onClick={() => handleChunkClick(chunk.id)}
                            className={`${styles['TextPlayer__Chunk']} ${i === textPlayerStore.index ? styles['is-active'] : ''}`}
                        >
                            {chunk.text}
                        </p>
                    ))}
                </div>
            </div>

            <footer className={styles['TextPlayer__Footer']}>
                <Slider
                    value={textPlayerStore.index}
                    onChange={handleMoveSlider}
                    max={textPlayerStore.content.length - 1}
                    marks
                />

                <div className={styles['TextPlayer__Controls']}>
                    <ButtonGroup
                        size="large"
                        variant="text"
                        aria-label="Basic button group"
                    >
                        {textPlayerStore.index ===
                            textPlayerStore.content.length - 1 && (
                            <Button onClick={() => textPlayerStore.restart()}>
                                <RestartAltIcon />
                            </Button>
                        )}

                        {textPlayerStore.isPlaying ? (
                            <Button onClick={() => textPlayerStore.pause()}>
                                <PauseIcon />
                            </Button>
                        ) : (
                            <Button onClick={() => textPlayerStore.play()}>
                                <PlayArrowIcon />
                            </Button>
                        )}

                        <Button onClick={() => textPlayerStore.stop()}>
                            <StopIcon />
                        </Button>
                    </ButtonGroup>
                </div>
            </footer>
        </article>
    );
};

export default observer(TextPlayer);
