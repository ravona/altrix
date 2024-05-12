import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';

export type Props = {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
};

const ReedPlayerSlider: React.FC<Props> = (props) => {
    return (
        <input
            className={styles['ReedPlayer__Slider']}
            type="range"
            min={0}
            value={props.value}
            onChange={(event) => {
                const newIndex = Number(event.target.value);
                props.onChange(newIndex);
            }}
            max={props.max}
        />
    );
};

export default ReedPlayerSlider;
