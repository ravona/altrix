import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { ReedPlayerContext } from '../../ReedPlayerContext';
import styles from '@altrix/shared-styles/projects/reed/ReedPlayer.module.scss';

const FloatingMenu: React.FC = () => {
    const store = useContext(ReedPlayerContext);
    return (
        <div className={styles['FloatingMenu']}>
            <Stack direction="row" gap={1}>
                <Fab
                    aria-label="toggle settings"
                    color={store.showPlayerOptions ? 'secondary' : 'primary'}
                    onClick={() => store.togglePlayerOptions()}
                    size="medium"
                >
                    <SettingsIcon fontSize="medium" />
                </Fab>

                <Fab
                    aria-label="add"
                    color={store.showStoryForm ? 'secondary' : 'primary'}
                    onClick={() => store.toggleShowStoryForm()}
                    size="medium"
                >
                    <AddIcon fontSize="medium" />
                </Fab>
            </Stack>
        </div>
    );
};

export default observer(FloatingMenu);
