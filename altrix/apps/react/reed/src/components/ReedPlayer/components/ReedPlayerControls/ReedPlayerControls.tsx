// # third-party:
// ## icons:
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import SettingsIcon from '@mui/icons-material/Settings';
import StopIcon from '@mui/icons-material/Stop';

import styles from './ReedPlayerControls.module.scss';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import { observer } from 'mobx-react';

export type Props = {
    onPrevFrame: () => void;
    onNextFrame: () => void;
    onPlay: () => void;
    onPause: () => void;
    onStop: () => void;
};

const ReedPlayerControls: React.FC<Props> = ({
    onPrevFrame,
    onNextFrame,
    onPlay,
    onPause,
    onStop,
}: Props) => {
    const store = useContext(ReedPlayerContext);

    return (
        <div className={styles['ReedPlayer__Controls']}>
            <button
                className={styles['ReedPlayer__Control']}
                type="button"
                onClick={onPrevFrame}
            >
                <FastRewindIcon />
            </button>
            <button
                className={styles['ReedPlayer__Control']}
                type="button"
                onClick={onNextFrame}
            >
                <FastForwardIcon />
            </button>

            {store.isPlaying ? (
                <>
                    <button
                        className={styles['ReedPlayer__Control']}
                        type="button"
                        onClick={() => {
                            onPause();
                        }}
                    >
                        <PauseIcon />
                    </button>
                </>
            ) : (
                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={() => {
                        onPlay();
                    }}
                >
                    <PlayArrowIcon />
                </button>
            )}
            {store.index !== 0 && (
                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={() => {
                        onStop();
                    }}
                >
                    <StopIcon />
                </button>
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

            <button
                className={styles['ReedPlayer__Control']}
                type="button"
                onClick={() => store.togglePlayerOptions()}
            >
                <SettingsIcon />
            </button>
        </div>
    );
};

export default observer(ReedPlayerControls);
