import { Frame } from '@altrix/reed-core';
import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';

export type Props = {
    frames: Frame[];
    activeFrame: Frame | null;
    onClickFrame: (frame: Frame) => void;
};

const ReedPlayerContent: React.FC<Props> = ({
    frames,
    activeFrame,
    onClickFrame,
}: Props) => {
    return (
        <div className={styles['ReedPlayer__Content']}>
            {frames.map((frame: Frame) => (
                <p
                    onClick={() => onClickFrame(frame)}
                    key={frame.id}
                    id={frame.id}
                    className={`${styles['ReedPlayer__Frame']} ${
                        activeFrame?.id === frame.id ? styles['is-active'] : ''
                    }`}
                >
                    {frame.text}
                </p>
            ))}
        </div>
    );
};

export default ReedPlayerContent;
