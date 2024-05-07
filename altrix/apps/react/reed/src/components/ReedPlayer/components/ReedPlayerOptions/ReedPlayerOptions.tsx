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
            <button
                className={styles['ReedPlayer__Control']}
                type="button"
                onClick={() => {
                    onChangeSpeed();
                }}
            >
                speed
            </button>

            <button
                className={styles['ReedPlayer__Control']}
                type="button"
                onClick={() => {
                    onChangeMode();
                }}
            >
                mode
            </button>

            <button
                className={styles['ReedPlayer__Control']}
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
