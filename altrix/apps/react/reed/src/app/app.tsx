import ReedPlayerComponent from '../components/ReedPlayer/ReedPlayer';
import { ReedPlayerProvider } from '../components/ReedPlayer/ReedPlayerContext';
import stories from '../data/stories.json';
import styles from './app.module.scss';
import sharedStyle from '@altrix/shared-styles/shared/ui/app.module.scss';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './customTheme';

export function App() {
    return (
        <main className={sharedStyle['app']}>
            <div className={styles['wrapper']}>
                <ReedPlayerProvider>
                    <ThemeProvider theme={darkTheme}>
                        <ReedPlayerComponent stories={stories} />
                    </ThemeProvider>
                </ReedPlayerProvider>
            </div>
        </main>
    );
}

export default App;
