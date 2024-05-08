import { Frame, Story } from '@altrix/reed-core';

import SettingsIcon from '@mui/icons-material/Settings';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import { observer } from 'mobx-react';

import React, { useContext, useRef } from 'react';
import { ReedPlayerContext } from './ReedPlayerContext';

import ReedPlayerContent from './components/ReedPlayerContent/ReedPlayerContent';
import ReedPlayerControls from './components/ReedPlayerControls/ReedPlayerControls';
import ReedPlayerHeader from './components/ReedPlayerHeader/ReedPlayerHeader';
import ReedPlayerOptions from './components/ReedPlayerOptions/ReedPlayerOptions';
import ReedPlayerSlider from './components/ReedPlayerSlider/ReedPlayerSlider';

import styles from './ReedPlayer.module.scss';

type Props = {
    stories: Story[];
    initialStory?: Story;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const store = useContext(ReedPlayerContext);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <article
            className={`${styles['ReedPlayer']} ${styles[`theme--${store.theme}`]}`}
        >
            <ReedPlayerHeader
                name={store.story?.name || ''}
                source={store.story?.source}
            />
            <div className={styles['ReedPlayer__Screen']} ref={containerRef}>
                <ReedPlayerContent
                    frames={store.frames}
                    activeFrame={store.activeFrame}
                    onClickFrame={(frame: Frame) => store.setActiveFrame(frame)}
                />
            </div>
            <footer className={styles['ReedPlayer__Footer']}>
                <ReedPlayerSlider
                    min={0}
                    max={store.frames.length - 1}
                    value={store.index}
                    onChange={(i) => store.setIndex(i)}
                />

                <ReedPlayerControls
                    onNextFrame={() => store.setIndex(store.index + 1)}
                    onPrevFrame={() => store.setIndex(store.index - 1)}
                    onPause={() => store.pause()}
                    onPlay={() => store.play()}
                    onStop={() => store.stop()}
                />

                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={() => store.togglePlayerOptions()}
                >
                    <SettingsIcon />
                </button>

                {store.showPlayerOptions && (
                    <ReedPlayerOptions
                        onChangeMode={() => console.log('mode changed')}
                        onChangeSpeed={() => console.log('speed changed')}
                        onChangeTheme={() => console.log('theme changed')}
                    />
                )}

                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={() => store.toggleShowPlaylist()}
                >
                    {store.showPlaylist ? (
                        <PlaylistRemoveIcon />
                    ) : (
                        <PlaylistPlayIcon />
                    )}
                </button>

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
            </footer>
        </article>
    );
};

export default observer(ReedPlayerComponent);
