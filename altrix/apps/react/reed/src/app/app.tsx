// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Container } from '@mui/material';
import TextPlayer from '../components/TextPlayer/TextPlayer';
import stories from '../data/stories.json';
import styles from './app.module.scss';

const myStory = stories[1];

export function App() {
    return (
        <Container maxWidth="md">
            <main className={styles['App']}>
                <TextPlayer
                    id={myStory.id}
                    name={myStory.name}
                    source={myStory.source}
                    content={myStory.content}
                />
            </main>
        </Container>
    );
}

export default App;
