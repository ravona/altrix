// # third-party:
// ## icons:
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import styles from './ReedPlayerControls.module.scss';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';

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
    const { index, isPlaying } = useContext(ReedPlayerContext);

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

            {isPlaying ? (
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
            {index !== 0 && (
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
        </div>
    );
};

export default ReedPlayerControls;
