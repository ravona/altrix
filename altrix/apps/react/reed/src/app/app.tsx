// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container } from '@mui/material';
import TextPlayer from '../components/TextPlayer/TextPlayer';
import stories from '../data/stories.json';
import styles from './app.module.scss';
import { textPlayerStore } from '../mobx/text-player.store';

export function App() {
    return (
        <Container maxWidth="md">
            <main className={styles['App']}>
                <TextPlayer
                    id={textPlayerStore.story?.id || ''}
                    name={textPlayerStore.story?.name || 'Story Name'}
                    source={textPlayerStore.story?.source || 'Story Source'}
                    content={textPlayerStore.story?.content || 'Story Content'}
                />
            </main>
        </Container>
    );
}

export default App;
