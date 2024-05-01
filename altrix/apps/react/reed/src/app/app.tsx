import TextPlayer from '../components/TextPlayer/TextPlayer';
import stories from '../data/stories.json';
import styles from './app.module.scss';
import { textPlayerStore } from '../mobx/text-player.store';
import sharedStyle from '@altrix/shared-styles/shared/ui/app.module.scss';

const myStory = stories[1];

export function App() {
    return (
        <main className={sharedStyle['app']}>
            <div className={styles['wrapper']}>
                <TextPlayer
                    id={textPlayerStore.story?.id || ''}
                    name={textPlayerStore.story?.name || 'Story Name'}
                    source={textPlayerStore.story?.source || 'Story Source'}
                    content={textPlayerStore.story?.content || 'Story Content'}
                />
            </div>
        </main>
    );
}

export default App;
