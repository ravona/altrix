import { Slider } from '@mui/material';

export type Props = {
    value: number;
    onChange: (event: any, newValue: number | number[]) => void;
    max: number;
};

const reedPlayerSlider: React.FC<Props> = (props) => {
    return (
        <Slider
            value={props.value}
            onChange={props.onChange}
            max={props.max}
            marks
        />
    );
};

export default reedPlayerSlider;
