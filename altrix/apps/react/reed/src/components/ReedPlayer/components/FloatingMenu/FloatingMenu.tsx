import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

import { observer } from 'mobx-react';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';

const FloatingMenu: React.FC = () => {
    const store = useContext(ReedPlayerContext);
    return (
        <div className={styles['FloatingMenu']}>
            <div>
                <button
                    aria-label="toggle settings"
                    color={store.showPlayerOptions ? 'secondary' : 'primary'}
                    onClick={() => store.togglePlayerOptions()}
                >
                    <SettingsIcon fontSize="medium" />
                </button>

                <button
                    aria-label="add"
                    color={store.showStoryForm ? 'secondary' : 'primary'}
                    onClick={() => store.toggleShowStoryForm()}
                >
                    <AddIcon fontSize="medium" />
                </button>
            </div>
        </div>
    );
};

export default observer(FloatingMenu);
