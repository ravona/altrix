// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Player from '../components/Player';
import stories from '../data/stories.json';
import styles from './app.module.scss';

const myStory = stories[3];

export function App() {
  return (
    <main>
      <h1>Reed</h1>
      <Player
        id={myStory.id}
        name={myStory.name}
        source={myStory.source}
        content={myStory.content}
      />
    </main>
  );
}

export default App;
