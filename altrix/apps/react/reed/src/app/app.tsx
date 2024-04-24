import TextPlayer from '../components/TextPlayer/TextPlayer';
import stories from '../data/stories.json';
import styles from './app.module.scss';
import sharedStyle from '@altrix/shared-styles/shared/ui/app.module.scss';

const myStory = stories[1];

export function App() {
    return (
        <main className={sharedStyle['app']}>
            <div className={styles['wrapper']}>
                <TextPlayer
                    id={myStory.id}
                    name={myStory.name}
                    source={myStory.source}
                    content={myStory.content}
                />
            </div>
        </main>
    );
}

export default App;
