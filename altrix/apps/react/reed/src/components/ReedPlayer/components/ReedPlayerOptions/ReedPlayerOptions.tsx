import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import { observer } from 'mobx-react';
import {
    PlayerMode,
    PlayerSpeed,
    PlayerSplitPattern,
    PlayerTheme,
} from '@altrix/reed-core';

const ReedPlayerOptions: React.FC = () => {
    const store = useContext(ReedPlayerContext);
    return (
        <div className={styles['ReedPlayer__Options']}>
            <form>
                <label id="player-speed">Speed</label>
                <div>
                    <DirectionsRunIcon />
                    <input
                        type="range"
                        aria-label="Speed"
                        id="speed"
                        min={1}
                        max={5}
                        value={store.playerSpeed}
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            store.setPlayerSpeed(
                                target.value as unknown as PlayerSpeed,
                            );
                        }}
                    />
                    <DirectionsWalkIcon />
                </div>

                <div>
                    <label id="player-mode">Mode</label>
                    <fieldset
                        aria-labelledby="player-mode-group-label"
                        defaultValue="auto"
                        name="player-mode-group"
                        onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            store.setMode(target.value as PlayerMode);
                        }}
                    >
                        <input
                            type="radio"
                            id="auto"
                            name="player-mode"
                            value="auto"
                        />
                        <input
                            type="radio"
                            id="manual"
                            name="player-mode"
                            value="manual"
                        />
                    </fieldset>
                </div>

                <div>
                    <label id="player-theme">Theme</label>
                    <select
                        id="theme-select"
                        value={store.theme}
                        onChange={(e) => {
                            store.setTheme(e.target.value as PlayerTheme);
                        }}
                    >
                        <option value={'base'}>Base</option>
                        <option value={'dark'}>Dark</option>
                        <option value={'potter'}>Potter</option>
                    </select>
                </div>

                <div>
                    <label id="player-split-pattern">Split by:</label>
                    <select
                        id="player-split-pattern"
                        value={store.playerSplitPattern}
                        onChange={(e) => {
                            store.setSplitPattern(
                                e.target.value as PlayerSplitPattern,
                            );
                        }}
                    >
                        <option value={'words'}>Words</option>
                        <option value={'sentences'}>Sentences</option>
                        <option value={'paragraphs'}>Paragraphs</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default observer(ReedPlayerOptions);
