import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Slider from '@mui/material/Slider';

import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import { observer } from 'mobx-react';
import { PlayerMode, PlayerSpeed, PlayerTheme } from '@altrix/reed-core';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
} from '@mui/material';

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

            <FormControl fullWidth sx={{ py: 3 }}>
                <FormLabel id="player-mode">Mode</FormLabel>
                <RadioGroup
                    aria-labelledby="player-mode-group-label"
                    defaultValue="auto"
                    name="player-mode-group"
                    row
                    value={store.playerMode}
                    onChange={(e) => {
                        store.setMode(e.target.value as PlayerMode);
                    }}
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
                <FormLabel id="player-theme">Theme</FormLabel>
                <Select
                    variant="standard"
                    labelId="theme-select-label"
                    id="theme-select"
                    value={store.theme}
                    label="Theme"
                    onChange={(e) => {
                        store.setTheme(e.target.value as PlayerTheme);
                    }}
                >
                    <MenuItem value={'base'}>Base</MenuItem>
                    <MenuItem value={'dark'}>Dark</MenuItem>
                    <MenuItem value={'potter'}>Potter</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default observer(ReedPlayerOptions);
