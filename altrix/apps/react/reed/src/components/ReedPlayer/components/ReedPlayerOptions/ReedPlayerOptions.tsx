import Slider from '@mui/material/Slider';

import styles from './ReedPlayerOptions.module.scss';

export type Props = {
    onChangeSpeed: () => void;
    onChangeMode: () => void;
    onChangeTheme: () => void;
};

const ReedPlayerOptions: React.FC<Props> = ({
    onChangeSpeed,
    onChangeMode,
    onChangeTheme,
}: Props) => {
    return (
        <div className={styles['ReedPlayer__Options']}>
            <Slider
                aria-label="Temperature"
                defaultValue={2}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={5}
                onChange={onChangeSpeed}
            />

            <button
                className={styles['ReedPlayer__Option']}
                type="button"
                onClick={() => {
                    onChangeMode();
                }}
            >
                mode
            </button>

            <button
                className={styles['ReedPlayer__Option']}
                type="button"
                onClick={() => {
                    onChangeTheme();
                }}
            >
                theme
            </button>
        </div>
    );
};

export default ReedPlayerOptions;
