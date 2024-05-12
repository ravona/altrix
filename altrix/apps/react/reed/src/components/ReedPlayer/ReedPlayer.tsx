import { Frame, Story } from '@altrix/reed-core';

import { observer } from 'mobx-react';

import React, { useContext, useRef } from 'react';
import { ReedPlayerContext } from './ReedPlayerContext';

import ReedPlayerContent from './components/ReedPlayerContent/ReedPlayerContent';
import ReedPlayerControls from './components/ReedPlayerControls/ReedPlayerControls';
import ReedPlayerHeader from './components/ReedPlayerHeader/ReedPlayerHeader';
import ReedPlayerOptions from './components/ReedPlayerOptions/ReedPlayerOptions';
import ReedPlayerSlider from './components/ReedPlayerSlider/ReedPlayerSlider';

import '@altrix/shared-styles/themes/_index.scss';

import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';
import FloatingMenu from './components/FloatingMenu/FloatingMenu';

type Props = {
    stories: Story[];
    initialStory?: Story;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const store = useContext(ReedPlayerContext);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <article
            className={`${styles['ReedPlayer']} ${`theme--${store.theme}`}`}
        >
            <ReedPlayerHeader
                name={store.story?.name || ''}
                source={store.story?.source}
            />
            <div className={styles['ReedPlayer__Screen']} ref={containerRef}>
                <ReedPlayerContent
                    frames={store.frames}
                    activeFrame={store.currentFrame}
                    onClickFrame={(frame: Frame) =>
                        store.handleClickFrame(frame)
                    }
                />
            </div>

            {store.playerMode === 'auto' && (
                <footer className={styles['ReedPlayer__Footer']}>
                    <ReedPlayerSlider
                        min={0}
                        max={store.frames.length - 1}
                        value={store.currentIndex}
                        onChange={(i) => {
                            store.setCurrentIndex(i);
                        }}
                    />

                    <ReedPlayerControls
                        onNextFrame={() => {
                            store.setCurrentIndex(store.currentIndex + 1);
                        }}
                        onPrevFrame={() =>
                            store.setCurrentIndex(store.currentIndex - 1)
                        }
                        onPause={() => store.pause()}
                        onPlay={() => store.play()}
                        onStop={() => store.stop()}
                    />
                </footer>
            )}

            {store.showPlaylist && (
                <ol className={styles['ReedPlayer__Playlist']}>
                    {props.stories.map((story: Story) => (
                        <li
                            className={styles['ReedPlayer__PlaylistItem']}
                            key={story.id}
                        >
                            <button
                                className="button"
                                type="button"
                                onClick={() => store.setStory(story)}
                            >
                                {story.name}
                            </button>
                        </li>
                    ))}
                </ol>
            )}

            {store.showPlayerOptions && <ReedPlayerOptions />}

            <FloatingMenu />
        </article>
    );
};

export default observer(ReedPlayerComponent);
