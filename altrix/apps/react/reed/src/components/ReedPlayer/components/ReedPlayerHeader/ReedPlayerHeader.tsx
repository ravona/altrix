import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';

export type Props = {
    name: string;
    source?: string;
};

const ReedPlayerHeader: React.FC<Props> = (props) => {
    return (
        <header className={styles['ReedPlayer__Header']}>
            <h2 className={`${styles['ReedPlayer__Header-Title']} heading`}>
                {props.name}
            </h2>
            {props.source && (
                <h3
                    className={`${styles['ReedPlayer__Header-Subtitle']} heading`}
                >
                    Source: {props.source}
                </h3>
            )}
        </header>
    );
};

export default ReedPlayerHeader;
