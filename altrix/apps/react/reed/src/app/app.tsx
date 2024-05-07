import ReedPlayerComponent from '../components/ReedPlayer/ReedPlayer';
import { ReedPlayerProvider } from '../components/ReedPlayer/ReedPlayerContext';
import stories from '../data/stories.json';
import styles from './app.module.scss';
import sharedStyle from '@altrix/shared-styles/shared/ui/app.module.scss';

export function App() {
    return (
        <main className={sharedStyle['app']}>
            <div className={styles['wrapper']}>
                <ReedPlayerProvider>
                    <ReedPlayerComponent stories={stories} />
                </ReedPlayerProvider>
            </div>
        </main>
    );
}

export default App;
