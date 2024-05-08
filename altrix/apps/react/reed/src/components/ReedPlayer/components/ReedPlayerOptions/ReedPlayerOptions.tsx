import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Slider from '@mui/material/Slider';

import styles from './ReedPlayerOptions.module.scss';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import { observer } from 'mobx-react';
import { PlayerSpeed, PlayerTheme } from '@altrix/reed-core';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
} from '@mui/material';
import { blue } from '@mui/material/colors';

const ReedPlayerOptions: React.FC = () => {
    const store = useContext(ReedPlayerContext);
    return (
        <div className={styles['ReedPlayer__Options']}>
            <FormControl fullWidth>
                <FormLabel id="player-speed">Speed</FormLabel>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ mb: 1 }}
                    alignItems="center"
                >
                    <DirectionsRunIcon />
                    <Slider
                        aria-label="Speed"
                        valueLabelDisplay="auto"
                        marks
                        min={1}
                        max={5}
                        value={store.playerSpeed}
                        onChange={(e, value) =>
                            store.setPlayerSpeed(value as PlayerSpeed)
                        }
                    />
                    <DirectionsWalkIcon />
                </Stack>
            </FormControl>

            <FormControl fullWidth>
                <FormLabel
                    style={{
                        color: 'var(--color-primary)',
                    }}
                    id="player-mode"
                >
                    Mode
                </FormLabel>
                <RadioGroup
                    aria-labelledby="player-mode-group-label"
                    defaultValue="auto"
                    name="player-mode-group"
                >
                    <FormControlLabel
                        value="auto"
                        control={<Radio />}
                        label="Auto"
                    />
                    <FormControlLabel
                        value="manual"
                        control={<Radio />}
                        label="Manual"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
                <FormLabel
                    style={{
                        color: 'var(--color-primary)',
                    }}
                    id="player-theme"
                >
                    Theme
                </FormLabel>
                <Select
                    variant="standard"
                    labelId="theme-select-label"
                    id="theme-select"
                    value={store.theme}
                    label="Theme"
                    onChange={(e) => {
                        store.setTheme(e.target.value as PlayerTheme);
                    }}
                    style={{
                        color: 'var(--color-primary)',
                    }}
                >
                    <MenuItem value={'base'}>Base</MenuItem>
                    <MenuItem value={'dark'}>Dark</MenuItem>
                    <MenuItem value={'light'}>Light</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default observer(ReedPlayerOptions);
